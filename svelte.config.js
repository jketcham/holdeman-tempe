import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      // See below for an explanation of these options
      routes: {
        include: ["/*"],
        exclude: ["<all>"],
      },
      platformProxy: {
        configPath: "wrangler.toml",
      },
    }),
    csp: {
      mode: "auto",
      directives: {
        "default-src": ["self"],
        "script-src": ["self"],
        "style-src": ["self", "unsafe-inline"], // Required for Tailwind
        "img-src": ["self", "data:"], // For local images and data URIs
        "font-src": ["self"], // For local fonts
        "connect-src": ["self"], // For API calls
        "form-action": ["self"], // For forms
        "frame-ancestors": ["none"], // Prevent framing
        "base-uri": ["self"], // Restrict base URI
        "object-src": ["none"], // Prevent object/embed
        "upgrade-insecure-requests": true, // Force HTTPS
      },
    },
  },
};

export default config;
