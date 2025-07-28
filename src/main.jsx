// Entry point for the React application

import './style.css'; // Import global and section-specific styles
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MDXProvider } from '@mdx-js/react'; // Provides custom components for MDX files
import ReferenceList from './components/ReferenceList'; // Custom component for references in MDX
import Footnote from './components/Footnote'; // Custom component for footnotes in MDX
import App from './App'; // Main App component

// Map MDX elements to custom React components
const components = { ReferenceList, Footnote };

// Render the React app into the root div in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provide custom components to all MDX content */}
    <MDXProvider components={components}>
      <App />
    </MDXProvider>
  </React.StrictMode>
);