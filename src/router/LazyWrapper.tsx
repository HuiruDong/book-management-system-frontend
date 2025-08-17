import React, { Suspense, type ReactNode } from 'react';
import { Spin, Result, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends React.Component<{ children: ReactNode }, ErrorBoundaryState> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Route loading error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Result
                    status='error'
                    title='页面加载失败'
                    subTitle='抱歉，页面加载时发生错误'
                    extra={
                        <Button type='primary' icon={<ReloadOutlined />} onClick={() => window.location.reload()}>
                            重新加载
                        </Button>
                    }
                />
            );
        }

        return this.props.children;
    }
}

interface LazyWrapperProps {
    children: ReactNode;
}

export const LazyWrapper: React.FC<LazyWrapperProps> = ({ children }) => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<Spin size='large' tip='加载中...' fullscreen />}>{children}</Suspense>
        </ErrorBoundary>
    );
};
