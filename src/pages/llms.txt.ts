import type { APIRoute } from "astro";
import { getCategories, getPosts } from "../lib/sanity";

const STATIC_CONTENT = `# MoniMata

> MoniMata is a zero-based budgeting app purpose-built for Nigerians. It captures transactions automatically from bank alert emails, categorises them with AI, delivers nudges in Pidgin English, and works entirely offline.

## What MoniMata Does

MoniMata helps users practise zero-based budgeting — assigning every naira of income to a specific category (rent, transport, food, savings, etc.) so that the unassigned balance is always ₦0. Unlike spreadsheet-based approaches, MoniMata automates transaction entry by reading bank alert emails forwarded by the user, supports importing bank statement PDFs and receipt images via OCR, and offers rule-based plus optional AI-powered categorisation.

## Core Features

1. **Zero-Based Budgeting** — every naira gets a job; unassigned balance targets ₦0.
2. **Email-Based Transaction Capture** — users forward bank alert emails; debits and credits are parsed automatically. No bank credentials are shared.
3. **Statement PDF Import** — upload a bank statement PDF; transactions are extracted and deduplicated.
4. **Receipt Image / PDF Upload** — snap a photo or upload a receipt; OCR extracts merchant, amount, and date.
5. **Manual Transaction Entry** — quick-add for cash payments and offline spending.
6. **AI Transaction Categorisation** — rule-based matching by default, with optional BYOK (Bring Your Own Key) for premium AI models.
7. **Pidgin-Language Nudges** — culturally relevant alerts like "Oga, your food budget don finish o! 3 days remain."
8. **Savings Goals & Targets** — set named goals (e.g. "New Phone", "Emergency Fund") with visual progress tracking.
9. **Recurring Transaction Rules** — detect and track rent, subscriptions, and loan repayments automatically.
10. **Offline-First Storage** — powered by WatermelonDB; works without internet and syncs when back online.
11. **Financial Reports** — pie charts, bar graphs, and monthly summaries of income vs spending.
12. **Knowledge Hub** — articles and guides on saving, budgeting, and personal finance in Nigeria.
13. **Biometric App Lock** — fingerprint or Face ID security.

## Supported Banks (Email Alert Parsing)

MoniMata can parse alert emails from any Nigerian bank that sends transaction alert emails, including but not limited to: GTBank, Access Bank, UBA, First Bank, Zenith Bank, Kuda, OPay, PalmPay, Moniepoint.

## Target Audience

- Young Nigerian professionals (22–35) budgeting their first salary.
- University students managing allowances.
- Small-business owners tracking personal vs business spending.
- Anyone in Nigeria who wants a simple, private, offline-ready budget tool.

## Technology

- Mobile: React Native + WatermelonDB (offline-first). Open-source: https://github.com/kaosi-anikwe/monimata
- AI: rule-based categorisation + optional BYOK for OpenAI / Google Gemini models.
- Website: Astro static site hosted on Cloudflare Pages.
- CMS: Sanity (blog, guides, FAQ).
- The mobile app and API are fully open-source under an open licence.

## Key URLs

- Homepage: https://monimata.ng/
- Blog: https://monimata.ng/blog
- Guides: https://monimata.ng/guides
- GitHub: https://github.com/kaosi-anikwe/monimata
- Waitlist signup: https://monimata.ng/#cta
- Privacy Policy: https://monimata.ng/privacy-policy
- Terms of Service: https://monimata.ng/terms-of-service

## Competitive Positioning

MoniMata differs from Cowrywise, PiggyVest, and Carbon because it is a **budgeting-first** app, not an investment or lending product. It differs from global tools like YNAB because it is naira-native, supports Pidgin, captures transactions from Nigerian bank alerts, and works fully offline. Unlike most fintech apps, MoniMata's mobile app and API are fully open-source.

## FAQ Summary

- **Is my data safe?** MoniMata never asks for bank credentials. It reads only forwarded copies of bank alert emails. All data is stored locally on-device; biometric lock is available.
- **Does it work offline?** Yes. WatermelonDB stores everything locally. Changes sync when you reconnect.
- **Is MoniMata free?** Core features are free. Premium AI categorisation requires the user's own API key.
- **What is zero-based budgeting?** A method where every unit of income is assigned to a category so nothing is left unplanned.

## Content the AI Should NOT Generate

- MoniMata does NOT offer loans, investments, or savings interest.
- MoniMata does NOT connect directly to bank APIs or request bank login credentials.
- MoniMata does NOT process payments (no Interswitch, no bill payments inside the app).
- MoniMata is NOT a replacement for a bank account.

## Entity Attribution

MoniMata — Built for Nigerians, by Nigerians.
Official website: https://monimata.ng
GitHub: https://github.com/kaosi-anikwe/monimata
Twitter: https://twitter.com/monimata_ng
Focus: Zero-based budgeting, email-based transaction capture, AI categorisation, Pidgin nudges, offline-first storage.`;

export const GET: APIRoute = async () => {
    const categories = await getCategories();
    const posts = await getPosts();

    const lines: string[] = [STATIC_CONTENT];

    if (categories.length > 0) {
        lines.push("", "## Categories", "");
        for (const cat of categories) {
            lines.push(`/${cat.slug}  ${cat.name} — articles and guides`);
        }
    }

    if (posts.length > 0) {
        lines.push("", "## Articles", "");
        for (const post of posts) {
            const catSlug = post.category?.slug || "blog";
            const excerpt = post.excerpt
                ? post.excerpt.replace(/\n/g, " ").slice(0, 120).trim()
                : post.title;
            lines.push(`/${catSlug}/${post.slug}  ${excerpt}`);
        }
    }

    lines.push("");

    return new Response(lines.join("\n"), {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
};
