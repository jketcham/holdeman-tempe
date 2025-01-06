export const cspDirectives = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'"], // Required for SvelteKit
  "style-src": ["'self'", "'unsafe-inline'"], // Required for Tailwind
  "img-src": ["'self'", "data:"], // For local images and data URIs
  "font-src": ["'self'"], // For local fonts
  "connect-src": ["'self'"], // For API calls
  "form-action": ["'self'"], // For forms
  "frame-ancestors": ["'none'"], // Prevent framing
  "base-uri": ["'self'"], // Restrict base URI
  "object-src": ["'none'"], // Prevent object/embed
  "upgrade-insecure-requests": [], // Force HTTPS
};

export const securityHeaders = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
};
