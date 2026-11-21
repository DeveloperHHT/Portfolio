# Portfolio

My personal site: who I am, what I build and how to reach me. React, Vite and TypeScript, in English and Turkish, hosted for free on GitHub Pages.

## What is on it

- Hero with a canvas network background, a typed role line and a tilting portrait and a word-by-word tagline, then About, What I do, Experience, Work, Stack, Off duty and Contact
- Dark and light themes, remembered per browser and following the system setting at first
- English and Turkish, switched in the header, remembered per browser
- Spotify player that only loads after a click, so no third-party request happens on page load
- Own address per language (`/` and `/tr/`), with Open Graph and Twitter preview, structured data, `robots.txt` and `sitemap.xml`, all built from the content files
- No analytics, no cookies, no tracking

## Layout

```
Frontend/        the site (Vite + React + TypeScript)
  src/content/   all copy, one typed object per language
  src/components one file per section
  src/styles/    design tokens and global styles
  Scripts/       build-time SEO plugin (head tags, /tr/ page, sitemap)
  Tests/         unit tests (Vitest) and browser tests (Playwright)
Docs/            design spec and the deploy guide
.github/         the Pages deploy workflow
```

## Run it locally

Node is installed inside the project, so nothing is installed globally. From the repo root:

```bash
cd Frontend
export PATH="$PWD/.node/bin:$PATH"   # project-local Node
npm ci
npm run dev                           # http://localhost:5173
```

Other scripts: `npm run build`, `npm run preview`, `npm run typecheck`, `npm test`, `npm run test:e2e`.

## Changing the content

Everything visible comes from `Frontend/src/content/en.ts` and `tr.ts`. Both files must keep the same structure; the unit tests fail if they drift apart or if an e-mail address or phone number sneaks in.

## Deploying

Pushing to `main` builds and publishes the site through GitHub Actions. The one-time setup, including a custom domain, is in [Docs/Deploy.md](Docs/Deploy.md). The design rules are in [Docs/Design.md](Docs/Design.md).
