import React from 'react';

// ReferenceList component displays a list of references with back-links to footnotes
function ReferenceList({ references }) {
  // If there are no references, render nothing
  if (!references || references.length === 0) return null;

  return (
    <div className="references">
      <h4>References</h4>
      <ul>
        {/* Render each reference as a paragraph with a back-link */}
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