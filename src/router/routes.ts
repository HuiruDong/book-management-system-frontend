import { type RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// 懒加载页面组件
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const BookManagement = lazy(() => import('../pages/BookManagement'));

export interface GuardConfig {
    requireAuth?: boolean;
    requireRole?: string[];
    fallbackPath?: string;
}

export interface RouteConfig extends Omit<RouteObject, 'element' | 'children'> {
    element: React.ComponentType<any>;
    guard?: GuardConfig;
    children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
    {
        path: '/login',
        element: Login,
    },
    {
        path: '/register',
        element: Register,
    },
    {
        path: '/',
        element: BookManagement,
        guard: {
            requireAuth: true,
        },
    },
];
