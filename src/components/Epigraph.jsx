import React from 'react';

// Epigraph component renders a styled block for quotes or introductory text
export default function Epigraph({ children }) {
  return (
    <div className="epigraph">
      {/* Render the epigraph content passed as children */}
      {children}
    </div>
  );
}