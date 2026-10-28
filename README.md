# Holdeman Neighborhood Association Website

The official website for the Holdeman Neighborhood Association in Tempe, Arizona.

Available at [holdemantempe.org](https://holdemantempe.org).

## Development

Requires a Node.js release with the October 2026 security fixes: 26.12.1 or newer (pinned in `.node-version`), or 24.22.1+ or 22.23.4+ on the older LTS lines. `npm install` refuses Node versions without these fixes.

First, install dependencies:

```bash
npm install
```

Then start the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building and Deployment

The website automatically deploys to production when changes are pushed to the `main` branch.

To create a production version locally:

```bash
npm run build
```

To preview the production build locally in the Cloudflare runtime (`wrangler pages dev`):

```bash
npm run preview
```

To manually deploy to Cloudflare Pages:

```bash
npm run deploy
```

## Technology Stack

- SvelteKit
- TypeScript
- TailwindCSS
- Cloudflare Pages
- Cloudflare D1 (database)
