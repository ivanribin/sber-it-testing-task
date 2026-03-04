import { Component, ReactNode } from "react";
import "./style.css";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: "",
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error: Error, errorInfo: unknown) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <ErrorFallback message={this.state.errorMessage} />;
        }

        return this.props.children;
    }
}

const ErrorFallback = ({ message }: { message: string }) => {
    return (
        <div className="error-boundary">
            <h2>Something went wrong!</h2>
            <p>{message}</p>
            <button
                className="button button-primary"
                onClick={() => window.location.reload()}
            >
                Reload Page
            </button>
        </div>
    );
};

export default ErrorBoundary;
