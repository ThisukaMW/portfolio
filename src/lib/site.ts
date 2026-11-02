// Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build time (e.g. "thisuka.vercel.app"),
// so link previews and the sitemap follow whatever domain the project ends up on.
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
