import React from 'react';

// Footnote component renders a superscripted footnote number with a link to the reference
function Footnote({ number }) {
  return (
    <sup id={`fn-${number}`}>
      {/* Link to the corresponding reference in the ReferenceList */}
      <a href={`#ref-${number}`}>[{number}]</a>
    </sup>
  );
}

export default Footnote;