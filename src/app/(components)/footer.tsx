import Link from "next/link";

import { FooterCopyright } from "@/app/(components)/footer-copyright";
import { GITHUB_URL } from "@/config";

interface FooterProps {
  links?: React.ReactNode;
  translations?: {
    tagline: string;
    aboutHeading: string;
    solutionsHeading: string;
    footerDescription: React.ReactNode;
    footerCreatedBy: string;
    resources: string;
  };
}

export function Footer({ links, translations }: FooterProps) {
  const footerDescription =
    translations?.footerDescription ?? DEFAULT_FOOTER_DESCRIPTION;
  const tagline = translations?.tagline ?? "Invoices for Saltmarsh Coffee Roasters";

  return (
    <footer className="w-full border-t border-slate-200 bg-white py-8">
      <div className="container mx-auto flex flex-col gap-4 px-4 md:px-6">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold text-slate-800">Quayside Invoice</p>
          <p className="text-sm text-slate-600">{tagline}</p>
        </div>
        <p className="max-w-2xl text-sm text-slate-600">{footerDescription}</p>
        {links}
        <div className="flex flex-col items-start justify-between gap-2 border-t border-slate-200 pt-4 md:flex-row md:items-center">
          <FooterCopyright />
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-slate-900"
          >
            Source code (AGPL-3.0)
          </Link>
        </div>
      </div>
    </footer>
  );
}

const DEFAULT_FOOTER_DESCRIPTION = (
  <>
    Create, preview and download invoices in seconds. Everything stays in your browser. Not accounting software. No compliance guarantees. By using this tool, you
    agree to the{" "}
    <Link href="/tos" className="text-slate-700 underline hover:text-slate-900">
      Terms of Service
    </Link>
  </>
);

const FOOTER_LINK_CLASSNAME = "text-sm text-slate-500 hover:text-slate-900";

interface FooterLinkItem {
  href: string;
  label: string;
  external?: boolean;
  /**
   * Render a plain `<a>` instead of `next/link`, so following it is a full page load.
   *
   * Needed for links to the invoice app's own routes (`/`, `/stripe-template`): a template
   * switch moves the address bar between them with `history.replaceState`, so the router
   * still holds the route the page was loaded on. A client-side navigation to that route
   * reuses the mounted editor, which keeps the old template under the new URL.
   */
  fullPageLoad?: boolean;
}

export function FooterLinkGroup({
  heading,
  links,
}: {
  heading: string;
  links: FooterLinkItem[];
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-700">
        {heading}
      </p>
      <ul className="space-y-2">
        {links.map((link) => {
          return (
            <li key={`${heading}-${link.label}`}>
              {link.fullPageLoad ? (
                <a href={link.href} className={FOOTER_LINK_CLASSNAME}>
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className={FOOTER_LINK_CLASSNAME}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
