import { render } from 'preact';
import { App } from './app';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/index.scss';

const initializeApp = (): void => {
  try {
    const root = document.getElementById('app');

    if (!root) {
      console.error('Root element with id "app" not found in the DOM');
      // Create a fallback root element if it doesn't exist
      const fallbackRoot = document.createElement('div');
      fallbackRoot.id = 'app';
      document.body.appendChild(fallbackRoot);
      console.warn('Created fallback root element');
      render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>,
        fallbackRoot
      );
      return;
    }

    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>,
      root
    );
  } catch (error) {
    console.error('Failed to initialize the application:', error);
    // Render a basic error message
    const errorRoot = document.createElement('div');
    errorRoot.id = 'app-error';
    errorRoot.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif; color: red;">
        <h1>Application Error</h1>
        <p>Failed to load the application. Please refresh the page.</p>
        <details>
          <summary>Error Details</summary>
          <pre>${error instanceof Error ? error.message : String(error)}</pre>
        </details>
      </div>
    `;
    document.body.appendChild(errorRoot);
  }
};

initializeApp();
