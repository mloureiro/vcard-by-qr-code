import { useMemo } from 'react';

// Route definitions
export const ROUTES = {
  HOME: '/',
  QR_GENERATOR: '/qr-generator',
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];

/**
 * Custom hook for client-side routing
 * Handles base path automatically for GitHub Pages deployment
 */
export function useRoutes() {
  const basePath = import.meta.env.BASE_URL;

  const { currentRoute, isValidRoute } = useMemo(() => {
    const pathname = window.location.pathname;
    // Remove base path and normalize
    const route = pathname.replace(basePath, '/').replace(/^\/+/, '/');

    // Match to known routes
    const validRoutes = Object.values(ROUTES);

    if (validRoutes.includes(route as Route)) {
      return { currentRoute: route as Route, isValidRoute: true };
    }

    // Invalid route - default to home but mark as invalid
    return { currentRoute: ROUTES.HOME, isValidRoute: false };
  }, [basePath]);

  return {
    currentRoute,
    isValidRoute,
    routes: ROUTES,
    basePath,
  };
}
