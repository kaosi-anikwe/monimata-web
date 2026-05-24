# monimata-web

Public marketing site, blog, and resource hub for **MoniMata** at
[monimata.ng](https://monimata.ng).

Built with [Astro](https://astro.build/) + [Sanity.io](https://www.sanity.io/),
styled with [Tailwind CSS v4](https://tailwindcss.com/), and edge-cached
globally via [Cloudflare Pages](https://pages.cloudflare.com/).

---

## What This Site Serves

| Section          | Description                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------ |
| **Landing page** | Product positioning, feature highlights, waitlist CTA.                                     |
| **Blog**         | Product updates, personal finance tips, engineering deep-dives. Authored in Sanity Studio. |
| **Guides**       | Step-by-step bank email forwarding setup, budgeting workflows. Authored in Sanity Studio.  |
| **Legal**        | Privacy Policy, Terms of Service.                                                          |
| **SEO / AEO**    | Build-time OG images, `llms.txt` for AI crawlers, sitemap, structured data (JSON-LD).      |

All content pages are statically generated at build time for maximum performance
and zero runtime data-layer vulnerabilities.

---

## Tech Stack

| Layer           | Technology                                                               |
| --------------- | ------------------------------------------------------------------------ |
| Framework       | [Astro](https://astro.build/) (Static Site Generation)                   |
| CMS             | [Sanity.io](https://www.sanity.io/) (headless, structured content)       |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite` plugin) |
| OG Images       | [satori](https://github.com/vercel/satori) + @resvg/resvg-js             |
| Hosting         | Cloudflare Pages (global edge CDN)                                       |
| Rebuild Trigger | Sanity webhook → Cloudflare deploy hook on content publish               |

---

## Architecture

```
  ┌─────────────────┐      publish         ┌────────────────────┐
  │  Sanity Studio  │ ──── webhook ──────► │  Cloudflare Pages  │
  │  (CMS authors)  │                      │ (rebuild & deploy) │
  └─────────────────┘                      └─────────┬──────────┘
                                                     │
                                                     ▼
                                            monimata.ng (edge CDN)
```

1. Content authors create or update posts/guides/FAQs in **Sanity Studio**.
2. On publish, a Sanity webhook hits the **Cloudflare Pages deploy hook**.
3. Cloudflare triggers a fresh Astro build that fetches content via the Sanity
   SDK (`@sanity/client`) at build time — producing static HTML.
4. The new build is deployed globally to Cloudflare's edge network.

No runtime API calls. No server. Every page is pre-rendered HTML.

---

## Project Structure

```
monimata-web/
├── public/
│   ├── images/
│   │   ├── favicon.png
│   │   ├── logo-full.svg
│   │   ├── logo-full-dark.svg
│   │   └── logo.png
│   ├── _redirects                  # Cloudflare redirect rules
│   └── robots.txt                  # Crawl directives + AI bot rules
├── src/
│   ├── assets/images/              # Local images (Astro <Image> optimisation)
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Stats.astro
│   │   ├── WhyMonimata.astro
│   │   ├── Features.astro
│   │   ├── HowItWorks.astro
│   │   ├── Gamification.astro
│   │   ├── FAQ.astro
│   │   ├── CTA.astro
│   │   ├── Footer.astro
│   │   └── PortableTextRenderer.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro        # HTML shell, meta tags, fonts, JSON-LD
│   │   └── PostLayout.astro        # Blog/guide post layout
│   ├── lib/
│   │   ├── sanity.ts               # Sanity client + GROQ query helpers
│   │   └── og.ts                   # Build-time OG image generation (satori)
│   ├── pages/
│   │   ├── index.astro             # Landing page
│   │   ├── [category]/
│   │   │   ├── index.astro         # Category listing (blog, guides)
│   │   │   └── [slug].astro        # Individual post
│   │   ├── og/
│   │   │   └── [...path].png.ts    # Dynamic OG image endpoint
│   │   ├── privacy-policy.astro
│   │   ├── terms-of-service.astro
│   │   ├── llms.txt.ts             # AI crawler context (AEO)
│   │   └── 404.astro
│   └── styles/
│       └── global.css              # Tailwind directives + custom properties
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── LICENSE
```

---

## Getting Started

### Prerequisites

- Node.js 22+
- npm
- A [Sanity.io](https://www.sanity.io/) project with a dataset

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

| Variable            | Description                      |
| ------------------- | -------------------------------- |
| `SANITY_PROJECT_ID` | Sanity project ID                |
| `SANITY_DATASET`    | Dataset name (e.g. `production`) |

### 3. Start dev server

```bash
npm run dev
```

Site available at `http://localhost:4321`.

### 4. Build for production

```bash
npm run build
npm run preview       # preview the production build locally
```

---

## Deployment

### Cloudflare Pages

1. Connect the repo to Cloudflare Pages.
2. Set build command: `npm run build`, output directory: `dist/`.
3. Set environment variable: `NODE_VERSION` = `22`.
4. Add Sanity environment variables in the Cloudflare dashboard.

### Sanity Rebuild Webhook

1. In Sanity → Settings → API → Webhooks, create a new webhook.
2. Set the URL to the **Cloudflare Pages deploy hook** (found in Pages →
   Settings → Builds & deployments → Deploy hooks).
3. Filter: `_type in ["post", "category", "faq"]`.
4. Trigger on: **Create**, **Update**, **Delete**.

Every content publish now triggers a fresh static build automatically.

---

## Content Authoring

All content is managed in **Sanity Studio** — no code changes needed for new
posts, guides, or FAQs. The Astro build fetches content via GROQ queries at
build time.

To add a **new content type**:

1. Define the schema in Sanity Studio.
2. Add a GROQ query in `src/lib/sanity.ts`.
3. Create the corresponding Astro page(s) in `src/pages/`.
4. Push — the next build picks it up.

---

## License

This repository is **proprietary**. See [LICENSE](LICENSE) for details.
