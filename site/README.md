# Lurker Drops — product site

Astro + TypeScript + Tailwind CSS + Lucide product page, deployed to GitHub Pages.
This folder is self-contained: it has its own dependencies, build, and output. Nothing
here is imported by the extension at the repository root.

## Commands

```bash
pnpm install
pnpm dev      # http://localhost:4321/lurker-drops/
pnpm build    # type check + static build in dist/
pnpm preview
pnpm deploy   # build and push dist/ to the gh-pages branch
```

## Structure

```
src/
  components/   page sections (hero, features, install, FAQ, footer)
  i18n/         typed dictionaries: en, pt-br, es
  layouts/      <head>, SEO tags, hreflang, JSON-LD
  pages/        / (en), /pt-br/, /es/, 404
  styles/       Tailwind entry and theme tokens
public/         icon, OG image, robots.txt, webmanifest
```

## Internationalization

URLs are `/` (English), `/pt-br/`, and `/es/`. Each page imports its dictionary from
`src/i18n`; the `Dictionary` type comes from `en.ts`, so a missing key fails the build.
Every page lists all locales as `hreflang` alternates, and `sitemap-index.xml` groups
them the same way.

## Download link

All install buttons point to:

```
https://github.com/diogobruni/lurker-drops/releases/latest/download/lurker-drops.zip
```

The release workflow publishes that asset with a fixed name, so the URL always serves
the newest release.

## Deployment

GitHub Pages serves the `gh-pages` branch (root). `pnpm deploy` builds and force-pushes
`dist/` there. `public/.nojekyll` is included so the `_astro/` directory is served.
