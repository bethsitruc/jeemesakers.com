import React from 'react';

function Footnote({ number }) {
  return (
    <sup id={`fn-${number}`}>
      <a href={`#ref-${number}`}>[{number}]</a>
    </sup>
  );
}

export default Footnote;