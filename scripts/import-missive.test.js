const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildEpigraph,
  looksLikeQuote,
  normalizeBody,
  parseEpigraphEntries,
} = require('./import-missive.js');

test('multi-line author paragraphs with quoted source titles stay in the author block', () => {
  const parsed = parseEpigraphEntries([
    '"From then [after 1856] the Tsar and his family would come regularly\nto Nice [France] to spend the winter."',
    '> Nice Cote Azur: Tourisme et Congrês\\\n> "Russians in Nice"',
    '[BODY]',
    'Body copy.',
  ]);

  const epigraph = buildEpigraph(parsed.entries);

  assert.match(
    epigraph,
    /<div className="epigraph-author"><p>Nice Cote Azur: Tourisme et Congrês<br\/>"Russians in Nice"<\/p><\/div>/
  );
  assert.equal(parsed.entries[0].quotes.length, 1);
  assert.deepEqual(parsed.entries[0].authors, ['> Nice Cote Azur: Tourisme et Congrês\\\n> "Russians in Nice"']);
});

test('quoted source titles in their own paragraph attach to the following author line', () => {
  const parsed = parseEpigraphEntries([
    '"From then [after 1856] the Tsar and his family would come regularly\nto Nice [France] to spend the winter."',
    '"Russians in Nice"',
    'Nice Cote Azur: Tourisme et Congrês',
    '[BODY]',
    'Body copy.',
  ]);

  const epigraph = buildEpigraph(parsed.entries);

  assert.match(
    epigraph,
    /<div className="epigraph-author"><p>"Russians in Nice"<br\/>Nice Cote Azur: Tourisme et Congrês<\/p><\/div>/
  );
  assert.equal(parsed.entries[0].quotes.length, 1);
  assert.deepEqual(parsed.entries[0].authors, ['"Russians in Nice"', 'Nice Cote Azur: Tourisme et Congrês']);
});

test('multi-line quotes are still recognized as quotes', () => {
  assert.equal(
    looksLikeQuote('"From then [after 1856] the Tsar and his family would come regularly\nto Nice [France] to spend the winter."'),
    true
  );
});

test('authorless epigraph entries with trailing footnotes are preserved', () => {
  const parsed = parseEpigraphEntries([
    '"First quote."',
    'Author One',
    '[BREAK]',
    '"Second quote."',
    'Author Two[^1]',
    '[BREAK]',
    '*"The summit [of 2026] is unlikely to alter the character and course\nof the U.S.-China relationship long term. It is about managing for\nstability, not solving outstanding concerns."*[^2]',
    '[BODY]',
    'Body copy.',
  ]);

  const epigraph = buildEpigraph(parsed.entries);

  assert.equal(parsed.entries.length, 3);
  assert.deepEqual(parsed.entries[2], {
    quotes: ['*"The summit [of 2026] is unlikely to alter the character and course\nof the U.S.-China relationship long term. It is about managing for\nstability, not solving outstanding concerns."*[^2]'],
    authors: [],
  });
  assert.match(
    epigraph,
    /<p>"The summit \[of 2026\] is unlikely to alter the character and course of the U\.S\.-China relationship long term\. It is about managing for stability, not solving outstanding concerns\."<Footnote number=\{2\} \/><\/p>/
  );
});

test('soft-wrapped epigraph quote lines collapse to spaces', () => {
  const epigraph = buildEpigraph([
    {
      quotes: ['"Line one\nline two\nline three."'],
      authors: [],
    },
  ]);

  assert.match(epigraph, /<p>"Line one line two line three\."<\/p>/);
});

test('explicit hard breaks in epigraph authors are preserved', () => {
  const epigraph = buildEpigraph([
    {
      quotes: ['"Quote."'],
      authors: ['> First line\\\n> Second line'],
    },
  ]);

  assert.match(
    epigraph,
    /<div className="epigraph-author"><p>First line<br\/>Second line<\/p><\/div>/
  );
});

test('body blockquotes are emitted as HTML and soft wraps collapse', () => {
  const body = normalizeBody([
    '> "When we take account of realistic uncertainty, replacing point\n> estimates by probability distributions that reflect current scientific\n> understanding, we find no reason to be highly confident."[^10]',
  ]);

  assert.match(
    body,
    /^<blockquote><p>"When we take account of realistic uncertainty, replacing point estimates by probability distributions that reflect current scientific understanding, we find no reason to be highly confident\."<Footnote number=\{10\} \/><\/p><\/blockquote>$/
  );
});

test('body blockquotes preserve explicit hard breaks', () => {
  const body = normalizeBody([
    '> First line\\\n> Second line',
  ]);

  assert.match(
    body,
    /^<blockquote><p>First line<br\/>Second line<\/p><\/blockquote>$/
  );
});
