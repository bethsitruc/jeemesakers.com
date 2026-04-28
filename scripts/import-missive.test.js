const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildEpigraph,
  looksLikeQuote,
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
