# Natalia L'Abbate — Portfolio

Static Next.js 16 portfolio for Natalia L'Abbate (Senior Product Designer, São Paulo).

## Local development

```bash
npm install
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000). Also reachable from other devices on the same Wi‑Fi at the LAN address printed by Next.

## Production build

```bash
npm run build
```

Outputs a fully static site into `out/`. Deploy anywhere that serves static files.

## Deploy to GitHub Pages

A workflow is already wired at [.github/workflows/deploy.yml](.github/workflows/deploy.yml). To activate it:

1. **Push the repo to GitHub.**
2. In the repo **Settings → Pages**, set the *Source* to **GitHub Actions**.
3. Choose your URL layout and uncomment the matching `BASE_PATH` line in `deploy.yml`:
   - `BASE_PATH: ""` — for a user/org page (`natalialabbate.github.io`) or a custom domain via CNAME.
   - `BASE_PATH: "/natalialabbate"` — for a project page (`neybarao.github.io/natalialabbate`). Match the string to the repo name.
4. (Optional, for a custom domain) add a file `public/CNAME` containing the domain, e.g. `natalialabbate.com`.
5. Push to `main` — the workflow builds, runs `next export`, and publishes `out/` to Pages. It also runs on manual dispatch.

The workflow adds `.nojekyll` automatically so Next's `_next/` folder isn't stripped by Jekyll.

## Analytics

Analytics is scaffolded in [app/analytics.tsx](app/analytics.tsx). To enable, add a repo secret `NEXT_PUBLIC_ANALYTICS_ID` (GA4 measurement ID) and expose it to the build step in `deploy.yml`:

```yaml
- run: npx next build
  env:
    BASE_PATH: ${{ env.BASE_PATH }}
    NEXT_PUBLIC_ANALYTICS_ID: ${{ secrets.NEXT_PUBLIC_ANALYTICS_ID }}
```

To swap for Plausible / Umami, replace the two `<Script>` tags in `app/analytics.tsx` — keep the env-var guard so a missing key won't ship a broken beacon.

## Structure

```
app/
  layout.tsx          # SEO, fonts, JSON-LD, theme-init script
  page.tsx            # Home: hero, work, about, process, contact
  work/[slug]/page.tsx  # Case study template (rich sections)
  cases.ts            # Case data — edit here to update slugs, meta, content
  site-header.tsx     # Fixed header with brand, nav, theme toggle, socials
  loading-screen.tsx  # Fires on every route via usePathname
  animations.tsx      # GSAP ScrollTrigger reveals
  theme-toggle.tsx    # Light/dark toggle (persisted in localStorage)
  analytics.tsx       # Provider slot, env-gated
  globals.css         # Design tokens (dark + light) and all component styles
  sitemap.ts / robots.ts
public/
  favicon.svg
```

Case URLs live at `/work/{slug}` — slugs are the project name (`ventas-grupo-plaenge`, `smart-safety`, `akumen`).
