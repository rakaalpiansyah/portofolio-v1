/** Resolve a file in /public against Vite's base (works with base: './'). */
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
