#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'src', 'posts');
const INDEX_PATH = path.join(POSTS_DIR, 'index.jsx');
const DEFAULT_IMAGE = '/images/missives/default-missive.svg';

function usage() {
  console.log(`Usage: node scripts/import-missive.js <input.docx> [options]

Options:
  --date YYYY-MM-DD   Use this date for the filename and post metadata
  --title "Title"     Override the title used in index.jsx
  --slug some-slug    Override the slug suffix or full dated slug
  --image /path.svg   Set the missive list image path
  --preview           Write the converted MDX to /tmp without changing the repo
  --confirm           Show the preview, then ask before writing to the repo
  --dry-run           Show what would be written without changing files
  -h, --help          Show this help

Examples:
  node scripts/import-missive.js "/path/to/missive.docx"
  node scripts/import-missive.js "/path/to/missive.docx" --date 2026-03-10
  node scripts/import-missive.js "/path/to/missive.docx" --preview
  node scripts/import-missive.js "/path/to/missive.docx" --confirm
  node scripts/import-missive.js "/path/to/missive.docx" --date 2026-03-10 --title "The Loss Of A Close Friend"
`);
}

function parseArgs(argv) {
  const options = {
    date: today(),
    image: DEFAULT_IMAGE,
    dryRun: false,
  };
  const positionals = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--date') {
      options.date = argv[index + 1];
      index += 1;
    } else if (arg === '--title') {
      options.title = argv[index + 1];
      index += 1;
    } else if (arg === '--slug') {
      options.slug = argv[index + 1];
      index += 1;
    } else if (arg === '--image') {
      options.image = argv[index + 1];
      index += 1;
    } else if (arg === '--preview') {
      options.preview = true;
    } else if (arg === '--confirm') {
      options.confirm = true;
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '-h' || arg === '--help') {
      options.help = true;
    } else if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      positionals.push(arg);
    }
  }

  options.input = positionals[0];
  return options;
}

function today() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function assertDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Invalid date "${value}". Use YYYY-MM-DD.`);
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function unslugify(value) {
  return smartTitleCase(value.replace(/-/g, ' '));
}

function smartTitleCase(value) {
  const smallWords = new Set(['a', 'an', 'and', 'at', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet']);
  const romanNumerals = /^(?=[ivxlcdm]+$)m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/i;

  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      const clean = word.toLowerCase();

      if (/^[A-Z0-9]{2,5}$/.test(word)) {
        return word;
      }

      if (romanNumerals.test(clean)) {
        return clean.toUpperCase();
      }

      if (index > 0 && smallWords.has(clean)) {
        return clean;
      }

      return clean.replace(/(^|[-(])([a-z])/g, (match, prefix, letter) => `${prefix}${letter.toUpperCase()}`);
    })
    .join(' ');
}

function stripWrappingEmphasis(value) {
  let text = value.trim();
  let changed = true;

  while (changed) {
    changed = false;

    for (const marker of ['***', '___', '**', '__', '*', '_']) {
      if (text.startsWith(marker) && text.endsWith(marker) && text.length > marker.length * 2) {
        text = text.slice(marker.length, -marker.length).trim();
        changed = true;
      }
    }
  }

  return text;
}

function splitTrailingFootnotes(value) {
  const match = value.match(/((?:\s*\[\^\d+\])+)$/);

  if (!match) {
    return {
      content: value,
      footnotes: '',
    };
  }

  return {
    content: value.slice(0, -match[1].length),
    footnotes: match[1].replace(/\s+/g, ''),
  };
}

function stripWrappingEmphasisPreservingFootnotes(value) {
  const { content, footnotes } = splitTrailingFootnotes(value.trim());
  return `${stripWrappingEmphasis(content)}${footnotes}`;
}

function normalizeMarkers(content) {
  return content
    .replace(/^[*_]+\s*\\?\[(BODY|BREAK)\\?\]\s*[*_]+\s*$/gm, '[$1]')
    .replace(/\\?\[BODY\\?\]/g, '[BODY]')
    .replace(/\\?\[BREAK\\?\]/g, '[BREAK]')
    .replace(/^[ \t]*\[(BODY|BREAK)\][ \t]*$/gm, '\n[$1]\n');
}

function splitParagraphs(content) {
  return normalizeMarkers(content)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function extractTitleFromParagraphs(paragraphs) {
  for (let index = 0; index < Math.min(paragraphs.length, 3); index += 1) {
    const paragraph = paragraphs[index];
    const plain = stripWrappingEmphasis(paragraph).replace(/\s+/g, ' ').trim();

    if (!plain) {
      continue;
    }

    const lettersOnly = plain.replace(/[^A-Za-z]/g, '');
    const looksUppercase = lettersOnly && lettersOnly === lettersOnly.toUpperCase();

    if (looksUppercase && plain.length <= 180) {
      return {
        index,
        raw: paragraph,
        title: smartTitleCase(plain),
      };
    }
  }

  return null;
}

function deriveFilenameTitle(inputPath) {
  const basename = path.basename(inputPath, path.extname(inputPath));
  return unslugify(basename);
}

function countQuoteCharacters(value) {
  const matches = value.match(/[“"']/g);
  return matches ? matches.length : 0;
}

function stripBlockquoteMarkers(value) {
  return value.replace(/^>[ \t]?/gm, '');
}

function isBlockquoteParagraph(value) {
  const lines = value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length > 0 && lines.every((line) => line.startsWith('>'));
}

function looksLikeAuthorText(plain) {
  if (!plain || plain === '[BODY]' || plain === '[BREAK]') {
    return false;
  }

  if (/^\[\^\d+\]:/.test(plain)) {
    return false;
  }

  if (plain.length > 220) {
    return false;
  }

  if (plain.split('\n').length > 4) {
    return false;
  }

  // A sentence ending with a colon usually introduces the body or a following
  // quotation; it is not an epigraph attribution. Treating it as an author can
  // cause the remainder of a Word-indented document to be absorbed by Epigraph.
  if (/:$/.test(plain)) {
    return false;
  }

  return /^(\(?[A-Z0-9][^.!?]*|--\s*.+)$/.test(plain);
}

function looksLikeQuote(paragraph) {
  const plain = stripWrappingEmphasisPreservingFootnotes(stripBlockquoteMarkers(paragraph)).trim();
  const blockquote = isBlockquoteParagraph(paragraph);

  if (!plain || plain === '[BODY]' || plain === '[BREAK]') {
    return false;
  }

  if (/^["“'`]/.test(plain)) {
    return true;
  }

  if (paragraph !== stripWrappingEmphasis(paragraph)) {
    return true;
  }

  const lines = plain
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (
    lines.length > 1
    && /^["“'`]/.test(lines[0])
    && /["”'`]$/.test(lines[lines.length - 1])
    && countQuoteCharacters(plain) >= 2
  ) {
    return true;
  }

  if (blockquote && looksLikeAuthorText(plain)) {
    return false;
  }

  return false;
}

function looksLikeAuthor(paragraph) {
  const plain = stripWrappingEmphasisPreservingFootnotes(stripBlockquoteMarkers(paragraph)).trim();

  if (!plain || plain === '[BODY]' || plain === '[BREAK]') {
    return false;
  }

  if (looksLikeQuote(paragraph)) {
    return false;
  }

  return looksLikeAuthorText(plain);
}

function looksLikeQuotedAttribution(paragraph, nextParagraph = '') {
  const plain = stripWrappingEmphasisPreservingFootnotes(paragraph).trim();

  if (!plain || !/^["“'`].+["”'`]$/.test(plain) || plain.includes('\n')) {
    return false;
  }

  if (plain.length > 160) {
    return false;
  }

  return looksLikeAuthor(nextParagraph);
}

function parseEpigraphSection(paragraphs) {
  const entry = {
    quotes: [],
    authors: [],
  };

  for (let index = 0; index < paragraphs.length; index += 1) {
    const paragraph = paragraphs[index];
    const nextParagraph = paragraphs[index + 1];

    if (looksLikeQuote(paragraph)) {
      if (entry.quotes.length > 0 && looksLikeQuotedAttribution(paragraph, nextParagraph)) {
        entry.authors.push(paragraph);
        continue;
      }

      entry.quotes.push(paragraph);
    } else if (paragraph !== '[BODY]' && paragraph !== '[BREAK]' && paragraph.trim()) {
      entry.authors.push(paragraph);
    }
  }

  return entry.quotes.length > 0 ? entry : null;
}

function parseEpigraphEntries(paragraphs) {
  const bodyIndex = paragraphs.indexOf('[BODY]');
  const explicitEpigraph = bodyIndex >= 0 ? paragraphs.slice(0, bodyIndex) : null;
  const bodyStartIndex = bodyIndex >= 0 ? bodyIndex + 1 : null;

  if (explicitEpigraph) {
    const sections = [];
    let current = [];

    for (const paragraph of explicitEpigraph) {
      if (paragraph === '[BREAK]') {
        if (current.length > 0) {
          sections.push(current);
          current = [];
        }
      } else {
        current.push(paragraph);
      }
    }

    if (current.length > 0) {
      sections.push(current);
    }

    return {
      entries: sections.map(parseEpigraphSection).filter(Boolean),
      bodyParagraphs: paragraphs.slice(bodyStartIndex).filter((paragraph) => paragraph !== '[BREAK]'),
    };
  }

  const entries = [];
  let current = null;
  let consumed = 0;

  for (let index = 0; index < paragraphs.length; index += 1) {
    const paragraph = paragraphs[index];

    if (paragraph === '[BREAK]') {
      if (current && current.quotes.length > 0) {
        entries.push(current);
        current = null;
      }
      consumed = index + 1;
      continue;
    }

    if (paragraph === '[BODY]') {
      consumed = index + 1;
      break;
    }

    if (!current) {
      if (looksLikeQuote(paragraph)) {
        current = { quotes: [paragraph], authors: [] };
        consumed = index + 1;
        continue;
      }

      break;
    }

    if (looksLikeQuote(paragraph) && current.authors.length === 0) {
      if (looksLikeQuotedAttribution(paragraph, paragraphs[index + 1])) {
        current.authors.push(paragraph);
        consumed = index + 1;
        continue;
      }

      current.quotes.push(paragraph);
      consumed = index + 1;
      continue;
    }

    if (looksLikeAuthor(paragraph)) {
      current.authors.push(paragraph);
      consumed = index + 1;
      continue;
    }

    entries.push(current);
    current = null;

    if (looksLikeQuote(paragraph)) {
      current = { quotes: [paragraph], authors: [] };
      consumed = index + 1;
      continue;
    }

    break;
  }

  if (current && current.quotes.length > 0) {
    entries.push(current);
  }

  return {
    entries,
    bodyParagraphs: paragraphs.slice(consumed).filter((paragraph) => paragraph !== '[BREAK]' && paragraph !== '[BODY]'),
  };
}

function renderInlineHtml(markdown) {
  return markdown
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>');
}

function normalizeDashRuns(value) {
  if (!value) {
    return value;
  }

  return value
    .split('\n')
    .map((line) => {
      if (line.trim() === '---') {
        return line;
      }

      return line.replace(/\s*---\s*/g, ' - ');
    })
    .join('\n');
}

function normalizeEpigraphLineBreaks(value) {
  const hardBreakToken = '<<<MISSIVE_HARD_BREAK>>>';

  return value
    .replace(/\\\n/g, hardBreakToken)
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(new RegExp(hardBreakToken, 'g'), '\n')
    .trim();
}

function renderEpigraphParagraph(paragraph) {
  const cleaned = stripWrappingEmphasisPreservingFootnotes(paragraph)
    .replace(/^>[ \t]?/gm, '')
    .trim();

  return renderInlineHtml(normalizeDashRuns(normalizeEpigraphLineBreaks(cleaned)))
    .replace(/\[\^(\d+)\]/g, '<Footnote number={$1} />')
    .replace(/\n/g, '<br/>');
}

function renderBlockquoteParagraph(paragraph) {
  const cleaned = paragraph
    .replace(/^>[ \t]?/gm, '')
    .trim();

  return `<blockquote><p>${renderInlineHtml(normalizeDashRuns(normalizeEpigraphLineBreaks(cleaned)))
    .replace(/\[\^(\d+)\]/g, '<Footnote number={$1} />')
    .replace(/\n/g, '<br/>')}</p></blockquote>`;
}

function unwrapBodyWideIndentationArtifact(paragraphs) {
  const firstReferenceIndex = paragraphs.findIndex((paragraph) => /^\[\^\d+\]:/.test(paragraph.trim()));
  const articleParagraphs = firstReferenceIndex >= 0
    ? paragraphs.slice(0, firstReferenceIndex)
    : paragraphs;
  const totalLength = articleParagraphs.reduce(
    (sum, paragraph) => sum + stripBlockquoteMarkers(paragraph).trim().length,
    0
  );

  return paragraphs.flatMap((paragraph, index) => {
    if (index === 0 || !isBlockquoteParagraph(paragraph)) {
      return paragraph;
    }

    const unwrapped = stripBlockquoteMarkers(paragraph).trim();
    const logicalParagraphs = unwrapped
      .split(/\n\s*\n/)
      .map((part) => part.trim())
      .filter(Boolean);
    const occupiesMostOfBody = totalLength > 0 && unwrapped.length / totalLength >= 0.75;

    // Word sometimes represents ordinary first-line indentation in a way that
    // Pandoc interprets as one enormous blockquote. A genuine body quote is
    // normally much shorter; only unwrap a multi-paragraph quote that consumes
    // nearly all of the body and follows ordinary introductory copy.
    if (logicalParagraphs.length >= 5 && occupiesMostOfBody) {
      const [firstParagraph, ...remainingParagraphs] = logicalParagraphs;

      // Preserve the genuinely quoted opening paragraph when Word has
      // accidentally carried its quote indentation through the rest of the
      // document, then return the remaining paragraphs to normal body copy.
      if (/^["“]/.test(firstParagraph)) {
        const restoredQuote = firstParagraph
          .split('\n')
          .map((line) => `> ${line}`)
          .join('\n');
        return [restoredQuote, ...remainingParagraphs];
      }

      return logicalParagraphs;
    }

    return paragraph;
  });
}

function buildEpigraph(entries) {
  if (!entries.length) {
    return '';
  }

  const lines = ['<Epigraph>'];

  for (const entry of entries) {
    for (const quote of entry.quotes) {
      lines.push(`<p>${renderEpigraphParagraph(quote)}</p>`);
      lines.push('');
    }

    if (entry.authors.length > 0) {
      const authorHtml = entry.authors.map(renderEpigraphParagraph).join('<br/>');
      lines.push(`<div className="epigraph-author"><p>${authorHtml}</p></div>`);
      lines.push('');
    }
  }

  lines.push('</Epigraph>');
  return lines.join('\n').replace(/\n{3,}/g, '\n\n');
}

function normalizeBody(paragraphs) {
  return unwrapBodyWideIndentationArtifact(paragraphs)
    .join('\n\n')
    .replace(/\\?\[BREAK\\?\]/g, '')
    .replace(/\[BREAK\]/g, '')
    .replace(/\\?\[BODY\\?\]/g, '')
    .replace(/\[BODY\]/g, '')
    .split('\n\n')
    .map((paragraph) => {
      const trimmed = paragraph.trim();

      if (!trimmed) {
        return '';
      }

      if (isBlockquoteParagraph(trimmed)) {
        return renderBlockquoteParagraph(trimmed);
      }

      if (trimmed.startsWith('<') || trimmed.startsWith('#') || trimmed.startsWith('import') || trimmed.length < 50) {
        return normalizeDashRuns(trimmed);
      }

      return normalizeDashRuns(trimmed
        .replace(/\n(?![#>\-*+\d.])/g, ' ')
        .replace(/\s+/g, ' ')
        .trim());
    })
    .filter(Boolean)
    .join('\n\n')
    .replace(/(\d+)\^(th|st|nd|rd)\^/g, '$1$2')
    .replace(/^\s*(?:\\?\*){4,}\s*$/gm, '---');
}

function extractReferences(content) {
  const footnoteRegex = /^\[\^(\d+)\]:\s+((?:.*(?:\n(?!\[\^).*)*)*)/gm;
  const references = [];
  let match;

  while ((match = footnoteRegex.exec(content)) !== null) {
    references.push(
      match[2]
        .replace(/\n\s+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    );
  }

  const body = content
    .replace(footnoteRegex, '')
    .trim()
    .replace(/\[\^(\d+)\]/g, '<Footnote number={$1} />');

  return { body, references };
}

function parseReferenceLinks(reference) {
  const tokens = [];
  const linkRegex = /<a\b[^>]*\bhref=(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a>|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gi;
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(reference)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: 'text',
        value: reference.slice(lastIndex, match.index),
      });
    }

    tokens.push({
      type: 'link',
      href: match[2] || match[5],
      label: match[3] || match[4],
    });
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < reference.length) {
    tokens.push({
      type: 'text',
      value: reference.slice(lastIndex),
    });
  }

  return tokens;
}

function parseReferenceEmphasis(value) {
  const tokens = [];
  const emphasisRegex = /\*([^*\n]+)\*/g;
  let lastIndex = 0;
  let match;

  while ((match = emphasisRegex.exec(value)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: 'text',
        value: value.slice(lastIndex, match.index),
      });
    }

    tokens.push({
      type: 'emphasis',
      value: match[1],
    });
    lastIndex = emphasisRegex.lastIndex;
  }

  if (lastIndex < value.length) {
    tokens.push({
      type: 'text',
      value: value.slice(lastIndex),
    });
  }

  return tokens;
}

function parseReferenceMarkup(reference) {
  return parseReferenceLinks(reference).flatMap((token) => {
    if (token.type !== 'text') {
      return token;
    }

    return parseReferenceEmphasis(token.value);
  });
}

function renderJsxText(value) {
  if (!value) {
    return '';
  }

  return `{${JSON.stringify(value)}}`;
}

function renderReferenceEntry(reference, index) {
  const numberedReference = `[${index + 1}] ${reference}`;
  const tokens = parseReferenceMarkup(numberedReference);

  if (!tokens.some((token) => token.type === 'link' || token.type === 'emphasis')) {
    return JSON.stringify(numberedReference);
  }

  return `<>${tokens.map((token) => {
    if (token.type === 'link') {
      return `<a href=${JSON.stringify(token.href)} target="_blank" rel="noreferrer">${renderJsxText(token.label)}</a>`;
    }

    if (token.type === 'emphasis') {
      return `<em>${renderJsxText(token.value)}</em>`;
    }

    return renderJsxText(token.value);
  }).join('')}</>`;
}

function buildMdx({ epigraph, body, references }) {
  const imports = [
    "import Footnote from '../components/Footnote';",
    "import ReferenceList from '../components/ReferenceList';",
    "import Epigraph from '../components/Epigraph';",
    '',
  ].join('\n');

  const referenceBlock = `<ReferenceList references={[\n${references.map((reference, index) => `  ${renderReferenceEntry(reference, index)}`).join(',\n')}\n]} />`;
  const sections = [imports];

  if (epigraph) {
    sections.push(epigraph);
    sections.push('');
  }

  sections.push(body);
  sections.push('');
  sections.push(referenceBlock);
  sections.push('');

  return sections.join('\n').replace(/\n{3,}/g, '\n\n');
}

function readPostBlocks(indexSource) {
  const marker = 'export const posts = [';
  const markerIndex = indexSource.indexOf(marker);

  if (markerIndex < 0) {
    throw new Error('Could not find post registry in src/posts/index.jsx');
  }

  const bodyStart = markerIndex + marker.length;
  const bodyEnd = indexSource.indexOf('];', bodyStart);

  if (bodyEnd < 0) {
    throw new Error('Could not find the end of the post registry in src/posts/index.jsx');
  }

  const arrayBody = indexSource.slice(bodyStart, bodyEnd);
  const lines = arrayBody.split('\n');
  const preamble = [];
  const blocks = [];
  let current = [];
  let depth = 0;
  let inBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!inBlock) {
      if (trimmed === '{') {
        inBlock = true;
        current = [line];
        depth = 1;
      } else {
        preamble.push(line);
      }
      continue;
    }

    current.push(line);
    depth += (line.match(/{/g) || []).length;
    depth -= (line.match(/}/g) || []).length;

    if (depth === 0) {
      blocks.push(current.join('\n'));
      current = [];
      inBlock = false;
    }
  }

  return {
    markerIndex,
    bodyStart,
    bodyEnd,
    preamble: preamble.join('\n'),
    blocks,
  };
}

function insertPostIntoIndex(indexSource, post) {
  const existingFiles = new Set([...indexSource.matchAll(/modulePath:\s+'\.\/(.+?\.mdx)'/g)].map((match) => match[1]));

  if (existingFiles.has(`${post.stem}.mdx`)) {
    throw new Error(`src/posts/${post.stem}.mdx is already registered in src/posts/index.jsx`);
  }

  let nextSource = indexSource;
  const postBlocks = readPostBlocks(nextSource);

  const newBlock = [
    '  {',
    `    slug: '${escapeSingleQuotes(post.stem)}',`,
    `    modulePath: './${escapeSingleQuotes(post.stem)}.mdx',`,
    '    metadata: {',
    `      title: '${escapeSingleQuotes(post.title)}',`,
      `      date: formatDate('${post.date}'),`,
    `      image: '${escapeSingleQuotes(post.image)}',`,
    '    },',
    '  },',
  ].join('\n');

  const datedBlocks = postBlocks.blocks.map((block) => {
    const match = block.match(/date:\s*formatDate\('([^']+)'\)/);
    return {
      block,
      date: match ? match[1] : '',
    };
  });

  let insertIndex = datedBlocks.findIndex((entry) => entry.date < post.date);
  if (insertIndex < 0) {
    insertIndex = datedBlocks.length;
  }

  const rebuiltBlocks = [...postBlocks.blocks];
  rebuiltBlocks.splice(insertIndex, 0, newBlock);

  const rebuiltBody = `${postBlocks.preamble}${postBlocks.preamble.endsWith('\n') ? '' : '\n'}${rebuiltBlocks.join('\n')}\n`;
  nextSource = `${nextSource.slice(0, postBlocks.bodyStart)}${rebuiltBody}${nextSource.slice(postBlocks.bodyEnd)}`;

  return {
    source: nextSource,
    insertIndex,
  };
}

function escapeSingleQuotes(value) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function convertDocxToMarkdown(inputPath) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'missive-import-'));
  const markdownPath = path.join(tempDir, 'missive.md');

  execFileSync('pandoc', [inputPath, '-f', 'docx', '-t', 'markdown', '-o', markdownPath], {
    stdio: 'inherit',
  });

  return {
    tempDir,
    content: fs.readFileSync(markdownPath, 'utf8'),
  };
}

function cleanupTempDir(tempDir) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

function buildPreviewPath(stem) {
  return path.join(os.tmpdir(), `missive-preview-${stem}.mdx`);
}

function buildHtmlPreviewPath(stem) {
  return path.join(os.tmpdir(), `missive-preview-${stem}.html`);
}

function printEpigraphPreview(epigraph) {
  console.log('Epigraph preview:');
  console.log('---');

  if (epigraph) {
    console.log(epigraph);
  } else {
    console.log('(none detected)');
  }

  console.log('---');
}

function renderBodyParagraph(paragraph) {
  const trimmed = paragraph.trim();

  if (!trimmed) {
    return '';
  }

  if (trimmed.startsWith('<')) {
    return trimmed;
  }

  if (/^#{1,6}\s+/.test(trimmed)) {
    const [, hashes, text] = trimmed.match(/^(#{1,6})\s+([\s\S]+)$/);
    const level = hashes.length;
    return `<h${level}>${renderInlineHtml(text)}</h${level}>`;
  }

  if (trimmed === '---') {
    return '<hr/>';
  }

  if (/^>\s?/.test(trimmed)) {
    const quote = trimmed
      .split('\n')
      .map((line) => line.replace(/^>\s?/, ''))
      .join('<br/>');
    return `<blockquote><p>${renderInlineHtml(quote)}</p></blockquote>`;
  }

  return `<p>${renderInlineHtml(trimmed).replace(/\n/g, '<br/>')}</p>`;
}

function buildHtmlPreview({ title, date, epigraph, body }) {
  const bodyHtml = body
    .split('\n\n')
    .map(renderBodyParagraph)
    .filter(Boolean)
    .join('\n');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      :root {
        color-scheme: light;
        --page: #f5efe4;
        --card: #fffaf2;
        --ink: #2d241d;
        --muted: #6a5a4d;
        --line: #d4c3ac;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Georgia, serif;
        background: linear-gradient(180deg, #efe5d3 0%, var(--page) 100%);
        color: var(--ink);
      }
      main {
        max-width: 900px;
        margin: 0 auto;
        padding: 48px 20px 72px;
      }
      .card {
        background: var(--card);
        border: 1px solid var(--line);
        border-radius: 18px;
        box-shadow: 0 10px 30px rgba(69, 52, 34, 0.08);
        padding: 32px;
      }
      h1, h2, h3, h4, h5, h6 {
        font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
        margin-top: 0;
        color: #231a13;
      }
      .meta {
        margin-bottom: 24px;
        color: var(--muted);
        font-size: 0.95rem;
      }
      .epigraph {
        margin: 0 0 28px;
        padding: 20px 24px;
        border-top: 2px solid var(--line);
        border-bottom: 2px solid var(--line);
        color: #3d3027;
      }
      .epigraph p {
        margin: 0 0 16px;
        line-height: 1.75;
      }
      .epigraph .epigraph-author p {
        text-align: right;
        color: var(--muted);
        margin-bottom: 22px;
      }
      .epigraph .epigraph-author:last-child p {
        margin-bottom: 0;
      }
      article p, article blockquote {
        line-height: 1.8;
        margin: 0 0 18px;
      }
      blockquote {
        border-left: 4px solid var(--line);
        padding-left: 16px;
        color: #4f4034;
      }
      hr {
        border: 0;
        border-top: 1px solid var(--line);
        margin: 28px 0;
      }
    </style>
  </head>
  <body>
    <main>
      <div class="card">
        <h1>${renderInlineHtml(title)}</h1>
        <div class="meta">${date}</div>
        ${epigraph ? `<section class="epigraph">${epigraph.replace('<Epigraph>', '').replace('</Epigraph>', '').trim()}</section>` : ''}
        <article>
${bodyHtml}
        </article>
      </div>
    </main>
  </body>
</html>`;
}

async function askForConfirmation() {
  const prompt = 'Write this missive into the repo? [y/N] ';

  if (process.stdin.isTTY && process.stdout.isTTY) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const answer = await new Promise((resolve) => {
      rl.question(prompt, resolve);
    });

    rl.close();
    return /^y(es)?$/i.test(answer.trim());
  }

  console.log(prompt);
  const answer = fs.readFileSync(0, 'utf8').trim().split(/\r?\n/)[0] || '';
  return /^y(es)?$/i.test(answer.trim());
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help || !options.input) {
    usage();
    process.exit(options.help ? 0 : 1);
  }

  assertDate(options.date);

  const inputPath = path.resolve(options.input);
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  const { tempDir, content } = convertDocxToMarkdown(inputPath);

  try {
    const paragraphs = splitParagraphs(content);
    const titleInfo = extractTitleFromParagraphs(paragraphs);
    const internalTitle = titleInfo ? titleInfo.title : null;
    const siteTitle = options.title || internalTitle || deriveFilenameTitle(inputPath);
    const slugOverride = options.slug ? options.slug.trim() : '';
    const stem = slugOverride
      ? (/^\d{4}-\d{2}-\d{2}-/.test(slugOverride) ? slugOverride : `${options.date}-${slugify(slugOverride)}`)
      : `${options.date}-${slugify(siteTitle)}`;
    const outputPath = path.join(POSTS_DIR, `${stem}.mdx`);

    if (fs.existsSync(outputPath)) {
      throw new Error(`Output file already exists: ${outputPath}`);
    }

    const contentParagraphs = titleInfo
      ? paragraphs.filter((paragraph, index) => index !== titleInfo.index)
      : paragraphs.slice();
    const parsed = parseEpigraphEntries(contentParagraphs);
    const epigraph = buildEpigraph(parsed.entries);
    const normalizedBody = normalizeBody(parsed.bodyParagraphs);
    const { body, references } = extractReferences(normalizedBody);
    const mdx = buildMdx({
      epigraph,
      body,
      references,
    });
    const indexSource = fs.readFileSync(INDEX_PATH, 'utf8');
    const updatedIndex = insertPostIntoIndex(indexSource, {
      date: options.date,
      stem,
      title: siteTitle,
      image: options.image,
    });

    if (options.preview || options.confirm) {
      const previewPath = buildPreviewPath(stem);
      const htmlPreviewPath = buildHtmlPreviewPath(stem);
      const htmlPreview = buildHtmlPreview({
        title: siteTitle,
        date: options.date,
        epigraph,
        body,
      });
      fs.writeFileSync(previewPath, mdx);
      fs.writeFileSync(htmlPreviewPath, htmlPreview);
      console.log(`Preview created: ${previewPath}`);
      console.log(`HTML preview: ${htmlPreviewPath}`);
      console.log(`Would update: ${INDEX_PATH}`);
      console.log(`Title: ${siteTitle}`);
      console.log(`Date: ${options.date}`);
      console.log(`Slug: ${stem}`);
      console.log(`Image: ${options.image}`);
      console.log(`Epigraph entries: ${parsed.entries.length}`);
      console.log(`Registry position: ${updatedIndex.insertIndex + 1}`);
      printEpigraphPreview(epigraph);

      if (options.preview && !options.confirm) {
        return;
      }

      const shouldWrite = await askForConfirmation();

      if (!shouldWrite) {
        console.log('Import cancelled.');
        return;
      }
    }

    if (!options.dryRun) {
      fs.writeFileSync(outputPath, mdx);
      fs.writeFileSync(INDEX_PATH, updatedIndex.source);
    }

    console.log(`${options.dryRun ? 'Would create' : 'Created'}: ${outputPath}`);
    console.log(`${options.dryRun ? 'Would update' : 'Updated'}: ${INDEX_PATH}`);
    console.log(`Title: ${siteTitle}`);
    console.log(`Date: ${options.date}`);
    console.log(`Slug: ${stem}`);
    console.log(`Image: ${options.image}`);
    console.log(`Epigraph entries: ${parsed.entries.length}`);
    console.log(`Registry position: ${updatedIndex.insertIndex + 1}`);
  } finally {
    cleanupTempDir(tempDir);
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`\nImport failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  buildEpigraph,
  buildMdx,
  extractReferences,
  looksLikeAuthor,
  looksLikeQuote,
  normalizeBody,
  parseEpigraphEntries,
  renderReferenceEntry,
};
