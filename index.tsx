import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// We need to clean up the static HTML body content to mount React properly
// while keeping the existing Head/Styles as requested.
const mountPoint = document.body;

// Clear the static content that was in the original HTML to prevent duplication
mountPoint.innerHTML = '<div id="root"></div>';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Failed to create root element");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
