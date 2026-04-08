# cj-vite-vue-pwa-template

Personal starter for Vue 3 SPAs: **Vite**, **Pinia**, **Vue Router**, **Bootstrap Reboot** + shared **house** CSS tokens, **PWA** (offline shell), **Vitest**, and optional **GitHub Pages** deploy via Actions.

## Use this template

1. On GitHub: enable **Settings → General → Template repository** on the upstream repo (once), then **Use this template** to create your own repo.
2. Clone your new repo.
3. **[After you create a repo](#after-you-create-a-repo-from-this-template)** — start with **Project identity and lockfile** so **`package.json`** `name` / **`repository`** and **`package-lock.json`** match your fork, then follow the rest of the checklist.
4. Use **[Commands](#commands)** for installs and scripts (after your lockfile is committed, **`npm ci`** is the default).

## Requirements

- **Node.js 24.x (LTS Krypton)**, e.g. from [`.nvmrc`](.nvmrc) with `nvm use` / `fnm use`. Minimum is under `engines` in [package.json](package.json).

## Commands

Use **`npm ci`** when [`package-lock.json`](package-lock.json) is committed (same as [CI](.github/workflows/ci.yml)). If you just [regenerated the lockfile](#after-you-create-a-repo-from-this-template) after using the template, you’re set.

```bash
npm ci
npm run dev
npm run test:run
npm run build
npm run preview   # optional: serve dist locally
```

## Environment / `VITE_BASE_PATH`

This template only uses **public** `VITE_*` variables (embedded in the client). **Do not put secrets** in any committed env file.

**Checked-in split:** [`.env.development`](.env.development) is loaded for `npm run dev`; [`.env.production`](.env.production) for `npm run build` (local production-style builds). They differ only in how `VITE_BASE_PATH` is set for each mode—open those files to see the values.

| File | Role |
|------|------|
| [`.env.development`](.env.development) | Dev server / `vite` in development mode. **Checked in.** |
| [`.env.production`](.env.production) | `vite build` when you run it locally. **Checked in.** |
| `.env.local` | Optional gitignored overrides for either mode (same keys); use for machine-specific paths without editing committed files (see [.gitignore](.gitignore)). |

The [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) build sets `VITE_BASE_PATH` to `/${{ github.event.repository.name }}/`, so **deploys stay correct** even if `.env.production` in git is stale after a rename—update `.env.production` anyway so local `npm run build` matches production.

## GitHub Pages

1. **Settings → Pages → Build and deployment → Source:** **GitHub Actions**.
2. Push to `main`; the **Deploy to GitHub Pages** workflow publishes `dist/`.

Project sites are served at `https://<user>.github.io/<repo>/`; the app and service worker expect a **trailing-slash** subpath in `VITE_BASE_PATH` for that layout.

## After you create a repo from this template

- [ ] **Project identity and lockfile.** In [`package.json`](package.json), set **`name`** (and **`description`** if you like) for your app—often aligned with your GitHub repo slug or a scoped npm name. Set **`repository.url`** to your repo’s full Git URL (or remove the field); don’t assume a one-segment find/replace across host, org, and repo name. Then install a **fresh** dependency tree and lockfile for your clone:

	```bash
	rm -rf node_modules package-lock.json
	npm install
	```

	Commit the updated **`package.json`** (if you changed it) and **`package-lock.json`**. From here on, use **`npm ci`** for installs and match what CI does.

- [ ] Set `VITE_BASE_PATH` in [`.env.production`](.env.production) to `/your-new-repo-name/` (trailing slash).
- [ ] Search/replace user-facing strings: [`index.html`](index.html) (page `<title>`, `apple-mobile-web-app-title`), [`public/manifest.webmanifest`](public/manifest.webmanifest), [`src/router.js`](src/router.js), [`src/views/HomeView.vue`](src/views/HomeView.vue).
- [ ] Optional: replace [`LICENSE`](LICENSE) copyright line with your legal name if you fork publicly.
- [ ] Finally, rewrite [`README.md`](README.md) for your project.
- [ ] Optional: tag a first baseline (e.g. **`v0.0.1`** or **`v0.1.0`**) and/or publish a GitHub **Release** so you have a clear “post-template” snapshot.

## Docs

Rules and conventions for AI coding agent: [AGENTS.md](AGENTS.md). Design guides, ADR process, and related documentation for all contributors—ai or human: [docs/README.md](docs/README.md).

## License

[MIT](LICENSE)
