import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import { generateRoutes } from './routeGenerator';

export const router = createBrowserRouter(generateRoutes(routes));
