import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (error: Error, reset: () => void) => React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Unhandled error while rendering:', error, errorInfo.componentStack);
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (!error) return children;
    if (fallback) return fallback(error, this.reset);

    return (
      <div
        role="alert"
        className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-950 px-6 text-center text-white"
      >
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="max-w-md text-slate-400">{error.message}</p>
        <button
          onClick={this.reset}
          className="rounded-lg border border-cyan-400 px-4 py-2 font-medium text-cyan-300 transition-colors hover:bg-cyan-400/10"
        >
          Try again
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
