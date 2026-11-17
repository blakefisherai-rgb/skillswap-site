# SkillSwap website

Marketing site and clickable product prototype for **SkillSwap**, a student venture concept created for ESBM 3700 (Group 11) at CU Boulder's Leeds School of Business.

> *Earn money. Build skills. Gain experience.*

Built with Next.js (App Router), TypeScript, and Tailwind CSS. Every page is static; there is no database or paid service.

## Run it locally

Requires Node 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000, with hot reload
```

To check a production build:

```bash
npm run build
npm start
npm run lint
```

## Where to edit things

All copy lives in data files, so you can change text without touching layout code.

| What | File |
|---|---|
| Tagline, one-liner, **contact email**, Formspree ID, production URL | `src/config/site.ts` |
| Nav links | `src/config/site.ts` (`nav`) |
| **Team** names, titles, bios, mission, vision, values | `src/data/team.ts` |
| **Team photos** | `public/team/<first-name>.jpg` (portrait, about 220×300 or larger) |
| Homepage sections | `src/data/home.ts` |
| Gig categories, example prices, "how it works" steps | `src/data/services.ts` |
| Fee tiers (10 / 12 / 15%) used by the pricing table and calculator | `src/data/pricing.ts` |
| For Students / For Clubs & Businesses copy, project packages | `src/data/audiences.ts` |
| Investors page: trends, market model, competition, ask, use of funds | `src/data/investors.ts` |
| Prototype sample people, gigs, reviews, MVP hypotheses | `src/data/prototype.ts` |
| Colors and fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |

### Contact email
Set `contactEmail` in `src/config/site.ts`. It appears in the footer and on the Contact page.

### Waitlist form
- With `formspreeId` empty (the default), submissions are saved in the visitor's own browser (`localStorage`, key `skillswap-waitlist`) and a success message is shown. **You will not receive these.**
- To receive submissions by email, create a free form at [formspree.io](https://formspree.io), then paste its ID (the part after `/f/`) into `formspreeId`.

## Brand files (for the pitch deck)

| File | Use |
|---|---|
| `public/brand/logo.svg` / `logo.png` | Full logo, navy text, transparent, 1200px wide |
| `public/brand/logo-white.svg` / `logo-white.png` | Full logo for dark (navy) slides |
| `public/brand/logo-mark.svg` / `logo-mark.png` | Swap-loop icon only |
| `public/brand/app-icon.svg` / `app-icon.png` | Icon on the peach→mint gradient, rounded square |
| `public/brand/share-image.png` | 1200×630 link-preview image |

Brand colors: navy `#102F47`, peach `#F7D9CA`, mint `#BEEDE3`, coral `#F2A28C`, cream `#F8F1E4`. Font: IBM Plex Sans.
Coral is a light color, so put **navy** text on coral buttons, not white (white fails contrast).

## Deploy / redeploy

The site is hosted on Vercel and connected to this GitHub repo:

- **Push to `main` and it redeploys automatically**, usually within a minute.
- Manual deploy from this folder: `npx vercel --prod`.
- If you change the production domain, update `url` in `src/config/site.ts` (or set `NEXT_PUBLIC_SITE_URL` in Vercel) so link previews point at the right address.

## Honesty notes

SkillSwap is a concept with no users yet. The prototype uses clearly labeled **sample data** (fictional people with initials avatars), the market sizing is labeled as an illustrative model, and no testimonials, logos, or traction are presented as real.
