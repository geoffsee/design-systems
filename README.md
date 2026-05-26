# Design Systems

A Bun-powered React app for browsing the design-system HTML files in `./design-systems`.

## Requirements

- [Bun](https://bun.com)

## Install

```bash
bun install
```

## Develop

```bash
bun run dev
```

The dev server defaults to `http://localhost:3000`. If that port is busy, run with another port:

```bash
PORT=3001 bun run dev
```

## Build

```bash
bun run build
```

The build outputs the React app to `dist/` and copies `design-systems/` into `dist/design-systems/` so previews work in static hosting.

## Deploy

GitHub Pages deployment is configured in `.github/workflows/pages.yml`.

On pushes to `main`, the workflow:

1. Installs dependencies with Bun.
2. Builds the app.
3. Uploads `dist/` as the Pages artifact.
4. Deploys to GitHub Pages.

In the GitHub repository settings, set Pages source to **GitHub Actions**.
