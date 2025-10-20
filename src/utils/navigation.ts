import type { Route } from '../hooks/useRoutes';

/**
 * Get the full URL for a route, including base path
 */
export function getRouteUrl(route: Route, params?: URLSearchParams): string {
  const basePath = import.meta.env.BASE_URL;
  const url = `${basePath}${route}`.replace(/\/+/g, '/');

  if (params) {
    return `${url}?${params.toString()}`;
  }

  return url;
}

/**
 * Navigate to a route programmatically
 */
export function navigateTo(route: Route, params?: URLSearchParams): void {
  window.location.href = getRouteUrl(route, params);
}
