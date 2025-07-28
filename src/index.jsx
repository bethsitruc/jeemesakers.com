// Entry point for rendering the React application (alternative to main.jsx)

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Main App component
import './style.css'; // Import global and section-specific styles

// Get the root DOM element to mount the React app
const container = document.getElementById('root');
const root = createRoot(container);

// Render the App component inside React.StrictMode for highlighting potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);