import type { NextConfig } from "next";

// Baseline security headers for every route. A Content-Security-Policy is
// deliberately not included yet: it needs allowances for Google Analytics and
// should be added and tested separately.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

// Content-Security-Policy, production only (the dev server needs eval for hot reload).
// 'unsafe-inline' for scripts is required for Next's inline bootstrap, the JSON-LD
// block and the Google Analytics init snippet; everything else is locked to this site
// plus the Google Analytics hosts.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const headerList = process.env.NODE_ENV === "production" ? [...securityHeaders, { key: "Content-Security-Policy", value: csp }] : securityHeaders;

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: headerList }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
