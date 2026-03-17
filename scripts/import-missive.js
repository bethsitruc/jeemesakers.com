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

function looksLikeQuote(paragraph) {
  const plain = stripWrappingEmphasis(paragraph).trim();
  const lineCount = plain.split('\n').length;

  if (!plain || plain === '[BODY]' || plain === '[BREAK]') {
    return false;
  }

  if (/^>/.test(plain)) {
    return true;
  }

  if (/^["“'`]/.test(plain)) {
    return true;
  }

  if (paragraph !== stripWrappingEmphasis(paragraph)) {
    return true;
  }

  if (lineCount > 1 && countQuoteCharacters(plain) >= 1) {
    return true;
  }

  return false;
}

function looksLikeAuthor(paragraph) {
  const plain = stripWrappingEmphasis(paragraph).trim();

  if (!plain || plain === '[BODY]' || plain === '[BREAK]') {
    return false;
  }

  if (looksLikeQuote(paragraph)) {
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

  return /^(\(?[A-Z0-9][^.!?]*|--\s*.+)$/.test(plain);
}

function parseEpigraphSection(paragraphs) {
  const entry = {
    quotes: [],
    authors: [],
  };

  for (const paragraph of paragraphs) {
    if (looksLikeQuote(paragraph)) {
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

function renderEpigraphParagraph(paragraph) {
  const cleaned = stripWrappingEmphasis(paragraph)
    .replace(/^>\s?/gm, '')
    .trim();

  return renderInlineHtml(cleaned).replace(/\n/g, '<br/>');
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
  return paragraphs
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

      if (trimmed.startsWith('<') || trimmed.startsWith('#') || trimmed.startsWith('import') || trimmed.length < 50) {
        return trimmed;
      }

      return trimmed
        .replace(/\n(?![#>\-*+\d.])/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
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
        .replace(/"/g, '\\"')
        .trim()
    );
  }

  const body = content
    .replace(footnoteRegex, '')
    .trim()
    .replace(/\[\^(\d+)\]/g, '<Footnote number={$1} />');

  return { body, references };
}

function buildMdx({ epigraph, body, references }) {
  const imports = [
    "import Footnote from '../components/Footnote';",
    "import ReferenceList from '../components/ReferenceList';",
    "import Epigraph from '../components/Epigraph';",
    '',
  ].join('\n');

  const referenceBlock = `<ReferenceList references={[\n${references.map((reference, index) => `  "[${index + 1}] ${reference}"`).join(',\n')}\n]} />`;
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

main().catch((error) => {
  console.error(`\nImport failed: ${error.message}`);
  process.exit(1);
});
