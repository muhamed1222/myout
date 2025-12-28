
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Initializes the React application.
 * Using the named export { createRoot } from 'react-dom/client'
 * is the standard and most reliable way for React 19.
 */
const init = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Critical Error: Root element '#root' not found in document.");
    return;
  }

  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Failed to render React application:", err);
    // Fallback UI for catastrophic mounting failures
    rootElement.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: 'Poppins', sans-serif; color: #0A0A0A;">
        <h1 style="font-size: 24px; margin-bottom: 16px;">Application Error</h1>
        <p style="color: #64748b;">Failed to start the application. Please refresh the page or try a different browser.</p>
        <div style="margin-top: 20px; font-size: 12px; color: #cbd5e1; font-family: monospace; white-space: pre-wrap;">
          ${err instanceof Error ? err.message : String(err)}
        </div>
      </div>
    `;
  }
};

// Check for DOM readiness before mounting the app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
