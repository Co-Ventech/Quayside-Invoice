"use client";

import { LinkIcon } from "lucide-react";
import { useState } from "react";

import { ProjectLogoDescription } from "@/app/(components)/project-logo-description";
import { APP_PAGE_HEADING } from "@/app/(main)/(app)/app-page-heading";
import { InvoicePDFDownloadLink } from "@/app/(main)/(app)/components/invoice-pdf-download-link";
import { ShareInvoiceButton } from "@/app/(main)/(app)/components/share-invoice-button";
import { type InvoiceData } from "@/app/schema";
import { ProjectLogo } from "@/components/etc/project-logo";
import { CustomTooltip } from "@/components/ui/tooltip";
import { umamiTrackEvent } from "@/lib/umami-analytics-track-event";

/**
 * Header component for the invoice page.
 *
 * Displays the project logo, description, and action buttons including:
 * - Share invoice button (with conditional rendering based on shareability)
 * - Download PDF button
 * @returns The rendered invoice page header with logo, description, and action buttons
 */
export function InvoicePageHeader({
  canShareInvoice,
  handleShareInvoice,
  isDesktop,
  invoiceDataState,
  isMobile,
  isSharedInvoice,
}: {
  canShareInvoice: boolean;
  handleShareInvoice: () => void;
  isDesktop: boolean;
  invoiceDataState: InvoiceData;
  isMobile: boolean;
  isSharedInvoice: boolean;
}) {
  return (
    <div data-testid="header">
      <p className="sr-only">
        Free & open-source. Create and download PDF invoices instantly - no
        signup required.
      </p>
      <div className="flex w-full flex-row flex-wrap items-center justify-between lg:flex-nowrap">
        <div className="relative bottom-2 mt-2 flex w-full flex-col justify-center sm:bottom-4 sm:mt-0">
          <div className="flex items-center">
            <ProjectLogo className="h-8 w-8" />
            <ProjectLogoDescription
              description={
                <h1 className="text-balance text-[12px] text-slate-700 sm:text-[13px]">
                  {APP_PAGE_HEADING[invoiceDataState.template]}
                </h1>
              }
            />
          </div>
        </div>
        {/* desktop only section (hidden on mobile) */}
        <div className="mb-1 hidden w-full flex-wrap justify-center gap-3 lg:flex lg:flex-nowrap lg:justify-end">
          {isSharedInvoice && isDesktop ? (
            <CustomTooltip
              trigger={
                <span
                  data-testid="shared-invoice-badge"
                  className="flex w-[115px] items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 shadow duration-500 animate-in fade-in slide-in-from-top-2"
                >
                  <LinkIcon className="size-3" />
                  Shared invoice
                </span>
              }
              content={"Viewing shared invoice"}
            />
          ) : null}

          {/* On mobile version, we show it in different place (bottom of the page)*/}
          {isDesktop ? (
            <>
              <ShareInvoiceButton
                canShareInvoice={canShareInvoice}
                handleShareInvoice={handleShareInvoice}
                className="mx-2 mb-2 w-full lg:mx-0 lg:mb-0 lg:w-auto"
              />
              <InvoicePDFDownloadLink
                invoiceData={invoiceDataState}
                isMobile={isMobile}
              />
            </>
          ) : null}

          {/* TODO: add later when PRO version is released, this is PRO FEATURE =) */}
          {/* {isDesktop ? (
              <InvoicePDFDownloadMultipleLanguages
                invoiceData={invoiceDataState}
              />
            ) : null} */}
        </div>
      </div>
      <div className="mb-2.5 flex flex-row items-center justify-center lg:-mb-1.5 lg:mt-4 lg:justify-start xl:mt-1">
        <ProjectInfoLinks />
      </div>

      {/* mobile only section (hidden on desktop) */}
      {isSharedInvoice && isMobile ? (
        <div className="mb-3 flex flex-row items-center justify-center">
          <span
            data-testid="shared-invoice-badge"
            className="flex w-[115px] items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 shadow duration-500 animate-in fade-in slide-in-from-top-2"
          >
            <LinkIcon className="size-3" />
            Shared invoice
          </span>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Renders project information links including demo video, feedback, and GitHub links.
 * Manages video dialog state for the "How it works" demo.
 */
function ProjectInfoLinks() {
  return null;
}
