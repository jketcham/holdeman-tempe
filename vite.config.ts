import adapter from "@sveltejs/adapter-cloudflare";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    sveltekit({
      // Consult https://svelte.dev/docs/kit/integrations
      // for more information about preprocessors
      preprocess: vitePreprocess(),

      adapter: adapter({
        // See https://svelte.dev/docs/kit/adapter-cloudflare for an explanation of these options
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
    }),
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    coverage: {
      // Vitest 4+ only reports files loaded by tests unless `include` is set
      include: ["src/**/*.{js,ts,svelte}"],
    },
  },
});
