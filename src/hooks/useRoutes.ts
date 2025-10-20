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

  const currentRoute = useMemo(() => {
    const pathname = window.location.pathname;
    // Remove base path and normalize
    const route = pathname.replace(basePath, '/').replace(/^\/+/, '/');

    // Match to known routes
    if (route === ROUTES.QR_GENERATOR) {
      return ROUTES.QR_GENERATOR;
    }

    return ROUTES.HOME;
  }, [basePath]);

  return {
    currentRoute,
    routes: ROUTES,
    basePath,
  };
}
