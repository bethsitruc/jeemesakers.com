import React from 'react';

function ReferenceList({ references }) {
  if (!references || references.length === 0) return null;

  return (
    <div className="references">
      <h4>References</h4>
      <ul>
        {references.map((ref, index) => (
          <p key={index} id={`ref-${index + 1}`}>
            {ref}
            {' '}
            <a href={`#fn-${index + 1}`} aria-label="Back to footnote">↩</a>
          </p>
        ))}
      </ul>
    </div>
  );
}

export default ReferenceList;