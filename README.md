# Quayside Invoice

A browser-based invoice generator for a fictional coffee roaster. Fill in the seller, buyer and line items, watch the PDF update live, then download or share it. Nothing is stored on a server: invoices live in the browser.

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3, `@react-pdf/renderer`, React Hook Form, Zod, `next-intl`.

## Run it

Requires Node 20+ and pnpm (via `corepack enable`).

```bash
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm dev                     # http://localhost:3000
```

Every variable in `.env.example` must be set because the app validates them at start-up, but the core editor does not use the email, storage or analytics services, so placeholder values are fine for local use.

Other commands: `pnpm build`, `pnpm type-check`, `pnpm lint`, `pnpm vitest --run`.

## Notes

- Saltmarsh Coffee Roasters and the sample customer are made up for demonstration.
- The welcome pop-up and the "star on GitHub" prompt are switched off in this build.

## Credits and licence

This project is a modified copy of [EasyInvoicePDF](https://github.com/VladSez/easy-invoice-pdf) by Vlad Sazonau, licensed under the **GNU AGPL-3.0**. The full licence is in `LICENSE`. Under the AGPL, anyone who uses a modified version over a network must be able to get its source code, so keep this repository's source available if you host it.
