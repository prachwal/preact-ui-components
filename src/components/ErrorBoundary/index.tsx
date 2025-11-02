import type { ComponentChildren, JSX } from 'preact';
import { Component, createRef } from 'preact/compat';

export interface ErrorBoundaryProps {
  children: ComponentChildren;
  fallback?:
    | ComponentChildren
    // eslint-disable-next-line no-unused-vars
    | ((_error: Error, _errorInfo: ErrorInfo) => ComponentChildren);
  // eslint-disable-next-line no-unused-vars
  onError?: (_error: Error, _errorInfo: ErrorInfo) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export interface ErrorInfo {
  componentStack: string;
}

/**
 * Error boundary component for catching and handling React/Preact errors
 * Provides fallback UI and error reporting
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render(): JSX.Element {
    if (this.state.hasError) {
      // Render fallback UI
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return this.props.fallback(
            this.state.error || new Error('Unknown error'),
            this.state.errorInfo || { componentStack: '' }
          );
        }
        return this.props.fallback as JSX.Element;
      }

      // Default error UI
      return (
        <div
          style={{
            padding: '20px',
            margin: '20px',
            border: '1px solid #ff6b6b',
            borderRadius: '8px',
            backgroundColor: '#fff5f5',
            color: '#c92a2a',
          }}
          role='alert'
        >
          <h2 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
            Something went wrong
          </h2>
          <p style={{ margin: '0 0 15px 0' }}>
            An unexpected error occurred. Please try refreshing the page.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <details style={{ fontSize: '14px' }}>
              <summary>Error Details (Development)</summary>
              <pre
                style={{
                  marginTop: '10px',
                  padding: '10px',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: '#495057',
                }}
              >
                {this.state.error.toString()}
                {this.state.errorInfo && (
                  <>
                    {'\n\nComponent Stack:'}
                    {this.state.errorInfo.componentStack}
                  </>
                )}
              </pre>
            </details>
          )}
          <button
            onClick={() =>
              this.setState({
                hasError: false,
                error: undefined,
                errorInfo: undefined,
              })
            }
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children as JSX.Element;
  }
}

/**
 * Hook for creating error boundaries in functional components
 * Note: This is a simplified version. For more complex use cases,
 * consider using the ErrorBoundary class component above.
 */
export const useErrorBoundary = () => {
  const ref = createRef<ErrorBoundary>();

  const resetError = () => {
    if (ref.current) {
      ref.current.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
      });
    }
  };

  return { errorBoundaryRef: ref, resetError };
};
