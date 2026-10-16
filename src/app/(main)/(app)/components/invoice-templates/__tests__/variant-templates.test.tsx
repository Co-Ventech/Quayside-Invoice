// @vitest-environment node

// IMPORTANT: it's fine to use this import directly in a node test
// eslint-disable-next-line no-restricted-imports
import { Document, Font, Page, renderToBuffer } from "@react-pdf/renderer";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";

import { SERVER_PDF_MOCK_INVOICE_DATA } from "@/app/api/generate-invoice/__tests__/server-pdf-fixture";
import { SUPPORTED_TEMPLATES } from "@/app/schema";

import { PDF_DEFAULT_TEMPLATE_STYLES } from "../invoice-pdf-default-template";
import { InvoiceBody } from "../invoice-pdf-default-template/invoice-body";
import {
  VARIANTS,
  type VariantTemplateName,
} from "../invoice-pdf-variant-templates";

vi.setConfig({ testTimeout: 30_000, hookTimeout: 30_000 });

Font.register({
  family: "Open Sans",
  fonts: [
    { src: `${process.cwd()}/public/fonts/open-sans-regular.ttf` },
    { src: `${process.cwd()}/public/fonts/open-sans-700.ttf`, fontWeight: 700 },
  ],
});

const VARIANT_NAMES = Object.keys(VARIANTS) as VariantTemplateName[];

describe("variant invoice templates", () => {
  it("are registered as supported templates", () => {
    for (const name of VARIANT_NAMES) {
      expect(SUPPORTED_TEMPLATES).toContain(name);
    }
  });

  it.each(VARIANT_NAMES)("renders the %s template to a PDF", async (name) => {
    const { styles, decoration } = VARIANTS[name];
    const invoiceData = { ...SERVER_PDF_MOCK_INVOICE_DATA, template: name };

    const buffer = await renderToBuffer(
      <Document title={`${name} test`}>
        <Page size="A4" style={styles.page}>
          {decoration}
          <InvoiceBody
            invoiceData={invoiceData}
            styles={styles}
            shouldLocaliseDates={false}
          />
        </Page>
      </Document>,
    );

    expect(buffer.subarray(0, 5).toString()).toBe("%PDF-");
    expect(buffer.length).toBeGreaterThan(5_000);

    // lets a person look at the output: DUMP_PDF_DIR=/some/dir pnpm vitest --run <this file>
    const dumpDir = process.env.DUMP_PDF_DIR;
    if (dumpDir) {
      mkdirSync(dumpDir, { recursive: true });
      writeFileSync(join(dumpDir, `${name}.pdf`), buffer);
    }
  });

  it("changes the look without changing the default stylesheet", () => {
    expect(PDF_DEFAULT_TEMPLATE_STYLES.page.padding).toBe(30);

    for (const name of VARIANT_NAMES) {
      expect(VARIANTS[name].styles.page).not.toEqual(
        PDF_DEFAULT_TEMPLATE_STYLES.page,
      );
    }
  });
});
