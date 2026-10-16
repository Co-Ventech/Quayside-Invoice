# Quayside Invoice

A browser-based invoice generator for a fictional coffee roaster. Fill in the seller, buyer and line items, watch the PDF update live, then download it or share a link. Invoices live in the browser, so there is no account, no database and nothing is uploaded.

Repository: https://github.com/Co-Ventech/Quayside-Invoice

## Features

- Live PDF preview beside the form, instant PDF download
- **Five invoice templates:** Default, Stripe, Modern (warm accent colour), Minimal (thin grey lines) and Ledger (green bands)
- 13 languages and 100+ currencies, VAT and tax handling, amount in words
- Optional logo, QR code, payment details, notes and signature lines
- Shareable links that carry the invoice inside the URL
- Drafts saved in the browser's local storage

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 3, Radix UI
- `@react-pdf/renderer` for the PDF and `pdfjs-dist` for the preview
- React Hook Form and Zod for forms and validation
- `next-intl` for the interface languages
- Vitest and Playwright for tests

## Run it

Requires Node 20+ and pnpm (`corepack enable`).

```bash
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm dev                     # http://localhost:3000
```

The app validates every variable in `.env.example` at start-up, but the core editor does not use the email, storage or analytics services, so placeholder values are fine for local use.

Other commands: `pnpm build`, `pnpm type-check`, `pnpm lint`, `pnpm vitest --run`.

## How the templates work

The Default and Stripe templates live in `src/app/(main)/(app)/components/invoice-templates/`. The **Modern, Minimal and Ledger** templates in `invoice-pdf-variant-templates/` reuse the Default layout and data handling and only change the look: colours, line weights, spacing and decorative bands. To add another one, add its name to `SUPPORTED_TEMPLATES` in `src/app/schema/index.ts` and give it a style entry in `invoice-pdf-variant-templates/index.tsx`.

## What is different from the original

- Rebranded as Quayside Invoice for Saltmarsh Coffee Roasters (a fictional business).
- Added the Modern, Minimal and Ledger templates.
- PDF fonts (Open Sans, Inter), icons and the social preview image are served from this project's `public/` folder instead of an external host. Font licences are in `public/fonts/FONTS-LICENSE.txt`.
- Removed the demo videos, the "How it works" dialog, the welcome pop-up, the GitHub-star prompts and the author's founder, changelog and about pages (they redirect to the home page).

## Notes

- Saltmarsh Coffee Roasters and the sample customer are made up for demonstration.
- Some unit tests that use `localStorage` fail on Node 25 because its built-in `localStorage` clashes with the test environment, and a few SEO structured-data tests still expect the original names. Some Playwright e2e tests still expect the removed videos. None of these affect the running app.
