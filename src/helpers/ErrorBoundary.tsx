import { Component, ErrorInfo, ReactNode } from "react";
import { TbFaceIdError } from "react-icons/tb";
import styles from "@/pages/offline_page/offline.page.module.scss";
import Button from "@/components/button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={styles.offline}>
          <TbFaceIdError size={60} />
          <h1 className="my-3 text-2xl font-semibold">
            Oops. Something went very wrong.
          </h1>
          <Button
            onClick={() => location.reload()}
            className="h-10 w-24 border bg-primaryColor text-white hover:bg-primaryColorHover"
          >
            RETRY
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
