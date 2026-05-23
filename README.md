# monimata-web

Public marketing site, blog, and resource hub for **MoniMata** at `monimata.ng`.

Built with [Astro](https://astro.build/) + [Sanity.io](https://www.sanity.io/),
styled with [Tailwind CSS](https://tailwindcss.com/), and edge-cached globally
via [Cloudflare Pages](https://pages.cloudflare.com/) (free tier).

---

## What This Site Serves

| Section          | Description                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------ |
| **Landing page** | Product positioning, feature highlights, download links, testimonials.                     |
| **Blog**         | Product updates, personal finance tips, engineering deep-dives. Authored in Sanity Studio. |
| **Guides**       | Step-by-step bank email forwarding setup (Access, GTBank, etc.), budgeting workflows.      |
| **Resources**    | FAQs, comparison pages, open-source contribution guide.                                    |
| **Legal**        | Privacy Policy, Terms of Service, MIT license notice.                                      |

All content pages are statically generated at build time for maximum performance
and zero runtime data-layer vulnerabilities.

---

## Tech Stack

| Layer           | Technology                                                         |
| --------------- | ------------------------------------------------------------------ |
| Framework       | [Astro](https://astro.build/) (Static Site Generation)             |
| CMS             | [Sanity.io](https://www.sanity.io/) (headless, structured content) |
| Styling         | [Tailwind CSS](https://tailwindcss.com/)                           |
| Hosting         | Cloudflare Pages (free tier, global edge CDN)                      |
| Rebuild Trigger | Sanity webhook → Cloudflare deploy hook on content publish         |

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

1. Content authors create or update posts/guides/pages in **Sanity Studio**.
2. On publish, a Sanity webhook hits the **Cloudflare Pages deploy hook**.
3. Cloudflare triggers a fresh Astro build that fetches content via the Sanity
   SDK (`@sanity/client`) at build time — producing static HTML.
4. The new build is deployed globally to Cloudflare's edge network.

No runtime API calls. No server. Every page is pre-rendered HTML.

---

## Planned Project Structure

```
monimata-web/
├── src/
│   ├── pages/
│   │   ├── index.astro            # Landing page
│   │   ├── blog/
│   │   │   ├── index.astro        # Blog listing
│   │   │   └── [slug].astro       # Individual blog post
│   │   ├── guides/
│   │   │   ├── index.astro        # Guide listing
│   │   │   └── [slug].astro       # Individual guide
│   │   ├── resources/
│   │   │   └── index.astro        # FAQs, resources
│   │   ├── privacy.astro          # Privacy Policy
│   │   └── terms.astro            # Terms of Service
│   ├── layouts/
│   │   ├── BaseLayout.astro       # HTML shell, meta tags, fonts
│   │   └── PostLayout.astro       # Blog/guide post layout
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   └── ...
│   ├── lib/
│   │   └── sanity.ts              # Sanity client + GROQ query helpers
│   └── styles/
│       └── global.css             # Tailwind directives
├── public/
│   ├── favicon.svg
│   └── og-image.png
├── sanity/
│   └── schema/                    # Sanity schema definitions (if co-located)
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
└── LICENSE
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- A [Sanity.io](https://www.sanity.io/) project with a dataset

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

| Variable            | Description                            |
| ------------------- | -------------------------------------- |
| `SANITY_PROJECT_ID` | Sanity project ID                      |
| `SANITY_DATASET`    | Dataset name (e.g. `production`)       |
| `SANITY_API_TOKEN`  | Read token for build-time GROQ queries |

### 3. Start dev server

```bash
pnpm dev
```

Site available at `http://localhost:4321`.

### 4. Build for production

```bash
pnpm build
pnpm preview       # preview the production build locally
```

---

## Deployment

### Cloudflare Pages

1. Connect the repo to Cloudflare Pages.
2. Set build command: `pnpm build`, output directory: `dist/`.
3. Add the environment variables above in Cloudflare dashboard.

### Sanity Rebuild Webhook

1. In Sanity → Settings → API → Webhooks, create a new webhook.
2. Set the URL to the **Cloudflare Pages deploy hook** (found in Pages → Settings → Builds & deployments → Deploy hooks).
3. Trigger on: **Create**, **Update**, **Delete** for content document types.

Every content publish now triggers a fresh static build automatically.

---

## Content Authoring

All content is managed in **Sanity Studio** — no code changes needed for new
posts or guides. The Astro build fetches content via GROQ queries at build time.

To add a **new content type**:

1. Define the schema in `sanity/schema/`.
2. Add a GROQ query in `src/lib/sanity.ts`.
3. Create the corresponding Astro page(s) in `src/pages/`.
4. Push — the next build picks it up.

---

## License

This repository is **proprietary**. See [LICENSE](LICENSE) for details.
