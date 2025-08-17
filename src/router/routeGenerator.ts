import { type RouteObject } from 'react-router-dom';
import { type RouteConfig } from './routes';
import { RouteGuard } from './RouteGuard';
import { LazyWrapper } from './LazyWrapper';
import { createElement, type ReactElement } from 'react';

export const generateRoutes = (routes: RouteConfig[]): RouteObject[] => {
    return routes.map((route) => {
        const { element: Component, guard, children, ...routeProps } = route;

        // 创建懒加载的路由元素，包装在统一的 LazyWrapper 中
        let routeElement: ReactElement = createElement(LazyWrapper, null, createElement(Component));

        // 如果有守卫配置，包装组件
        if (guard) {
            routeElement = createElement(
                RouteGuard,
                {
                    requireAuth: guard.requireAuth,
                    requireRole: guard.requireRole,
                    fallbackPath: guard.fallbackPath,
                },
                routeElement
            );
        }

        // 递归处理子路由
        const processedChildren = children ? generateRoutes(children) : undefined;

        return {
            ...routeProps,
            element: routeElement,
            children: processedChildren,
        } as RouteObject;
    });
};
