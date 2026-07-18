import React from 'react';

// Global styles component
export const GlobalStyles: React.FC = () => {
  return (
    <style>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
        scroll-padding-top: 80px;
      }

      body {
        min-height: 100vh;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: var(--bg-primary, #0f172a);
        background-image: var(--gradient-aurora, radial-gradient(circle at top left, rgba(124,58,237,0.08), transparent 25%), radial-gradient(circle at bottom right, rgba(6,182,212,0.06), transparent 22%));
        color: var(--text-color, #f8fafc);
      }

      .glass-panel {
        backdrop-filter: blur(24px);
        background: rgba(15, 23, 42, 0.65);
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 20px 80px rgba(15, 23, 42, 0.35);
      }

      .glass-light {
        backdrop-filter: blur(16px);
        background: rgba(255,255,255,var(--glass-opacity,0.7));
        border: 1px solid rgba(255,255,255,0.6);
        box-shadow: 0 10px 40px rgba(2,6,23,0.08);
      }

      .neural-grid {
        background-image: var(--neural-grid, none);
      }

      .highlight-glow {
        background: linear-gradient(135deg, rgba(124,58,237,0.85), rgba(59,130,246,0.35));
        box-shadow: 0 0 30px rgba(124,58,237,0.22);
      }

      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 12px;
      }

      ::-webkit-scrollbar-track {
        background: rgba(15, 23, 42, 0.5);
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 6px;
        transition: background 0.3s;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%);
      }

      /* Cursor styles */
      body {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="none" stroke="%23667eea" stroke-width="2" opacity="0.5"/><circle cx="16" cy="16" r="4" fill="%23667eea"/></svg>') 16 16, auto;
      }

      a {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="none" stroke="%23667eea" stroke-width="2" opacity="0.5"/><circle cx="16" cy="16" r="4" fill="%23667eea"/></svg>') 16 16, auto;
      }

      /* Smooth transitions */
      button, a, input, textarea {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Focus styles for accessibility */
      button:focus-visible,
      a:focus-visible,
      input:focus-visible,
      textarea:focus-visible {
        outline: 2px solid #0ea5e9;
        outline-offset: 2px;
      }
    `}</style>
  );
};
