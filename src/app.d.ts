// See https://svelte.dev/docs/kit/types#app
// for information about these interfaces
// Cloudflare bindings (DB, AUTH_STORE) are typed on `env` from "cloudflare:workers"
// by src/worker-configuration.d.ts, generated with `npm run cf-typegen`
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
  }
}

export {};
