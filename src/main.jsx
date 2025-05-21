// src/main.jsx
import './style.css'; 
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MDXProvider } from '@mdx-js/react';
import ReferenceList from './components/ReferenceList';
import Footnote from './components/Footnote';
import App from './App';

const components = { ReferenceList, Footnote };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MDXProvider components={components}>
      <App />
    </MDXProvider>
  </React.StrictMode>
);