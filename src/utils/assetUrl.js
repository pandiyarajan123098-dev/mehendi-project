/**
 * Helper to prepend Vite's BASE_URL to public asset paths.
 * Ensures images resolve correctly on root domain, subpaths, and GitHub Pages.
 */
export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl}${cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath}`;
};
