import { useEffect, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

interface RouteGuardProps extends PropsWithChildren {
    requireAuth?: boolean;
    requireRole?: string[];
    fallbackPath?: string;
}

// 这里实现你的认证逻辑
const isAuthenticated = (): boolean => {
    // 示例：检查 localStorage 中的 token
    return !!localStorage.getItem('token');
};

const hasRequiredRole = (roles: string[]): boolean => {
    // 示例：检查用户角色
    const userRole = localStorage.getItem('userRole');
    return roles.includes(userRole || '');
};

export const RouteGuard: React.FC<RouteGuardProps> = ({
    children,
    requireAuth = false,
    requireRole = [],
    fallbackPath = '/login',
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        // 检查认证状态
        if (requireAuth && !isAuthenticated()) {
            navigate(fallbackPath);
            return;
        }

        // 检查角色权限
        if (requireRole.length > 0 && !hasRequiredRole(requireRole)) {
            navigate(fallbackPath);
            return;
        }
    }, [navigate, requireAuth, requireRole, fallbackPath]);

    return children;
};
