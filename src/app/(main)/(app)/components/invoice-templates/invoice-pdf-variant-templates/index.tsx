import {
  Document,
  Page,
  StyleSheet,
  View,
  type Styles,
} from "@react-pdf/renderer/lib/react-pdf.browser";

import { type InvoiceData } from "@/app/schema";

import {
  PDF_DEFAULT_TEMPLATE_STYLES,
  type PdfDefaultTemplateStyles,
} from "../invoice-pdf-default-template";
import { InvoiceBody } from "../invoice-pdf-default-template/invoice-body";

/**
 * Extra templates that reuse the default template's layout and data handling, and only
 * change how it looks: colours, line weights, spacing and a decorative band.
 *
 * They share the default template's fonts, so no extra font files are needed.
 */
export type VariantTemplateName = "modern" | "minimal" | "ledger";

type StyleOverrides = Partial<
  Record<keyof PdfDefaultTemplateStyles, Styles[string]>
>;

/** The default stylesheet with some keys overridden (merged key by key, not replaced). */
function createVariantStyles(overrides: StyleOverrides) {
  const merged = Object.fromEntries(
    Object.entries(PDF_DEFAULT_TEMPLATE_STYLES).map(([key, value]) => {
      const override = overrides[key as keyof StyleOverrides];
      return [key, override ? { ...value, ...override } : value];
    }),
  ) as PdfDefaultTemplateStyles;

  return StyleSheet.create(merged) as PdfDefaultTemplateStyles;
}

const MODERN_ACCENT = "#7a441c";
const MODERN_HAIRLINE = "#dbc7b2";

const LEDGER_ACCENT = "#1f5f4a";
const LEDGER_HAIRLINE = "#a9c9bd";

const MINIMAL_INK = "#222222";
const MINIMAL_HAIRLINE = "#d4d4d4";

interface VariantDefinition {
  styles: PdfDefaultTemplateStyles;
  /** Decoration drawn on every page, behind and around the invoice body. */
  decoration: React.ReactNode;
}

export const VARIANTS = {
  // A warm accent colour: a band across the top, coloured headings and soft table lines
  modern: {
    styles: createVariantStyles({
      page: { padding: 36, paddingTop: 44, paddingBottom: 56 },
      header: { color: MODERN_ACCENT, fontSize: 18 },
      subheader: {
        color: MODERN_ACCENT,
        borderBottom: `1.5px solid ${MODERN_ACCENT}`,
      },
      boldText: { color: MODERN_ACCENT },
      tableCellBold: { color: MODERN_ACCENT },
      tableRow: { borderColor: MODERN_HAIRLINE },
      tableCol: { borderColor: MODERN_HAIRLINE },
      signatureLine: { borderTopColor: MODERN_ACCENT },
      footer: {
        left: 36,
        right: 36,
        borderTop: `1.5px solid ${MODERN_ACCENT}`,
      },
    }),
    decoration: (
      <View
        fixed
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 14,
          backgroundColor: MODERN_ACCENT,
        }}
      />
    ),
  },

  // Almost no ink: thin grey lines, dark grey text, generous margins
  minimal: {
    styles: createVariantStyles({
      page: { padding: 44, paddingBottom: 60, color: MINIMAL_INK },
      header: { fontSize: 20 },
      subheader: { color: "#555555", borderBottom: `0.5px solid ${MINIMAL_HAIRLINE}` },
      tableRow: { borderColor: MINIMAL_HAIRLINE },
      tableCol: { borderColor: MINIMAL_HAIRLINE },
      signatureLine: { borderTopColor: "#999999" },
      footer: {
        left: 44,
        right: 44,
        borderTop: `0.5px solid ${MINIMAL_HAIRLINE}`,
      },
    }),
    decoration: null,
  },

  // A green ledger: tinted paper, bands top and bottom, ruled table lines
  ledger: {
    styles: createVariantStyles({
      page: {
        padding: 34,
        paddingTop: 42,
        paddingBottom: 62,
        backgroundColor: "#fbfdfc",
      },
      header: { color: LEDGER_ACCENT },
      subheader: {
        color: LEDGER_ACCENT,
        borderBottom: `1px solid ${LEDGER_ACCENT}`,
      },
      boldText: { color: LEDGER_ACCENT },
      tableCellBold: { color: LEDGER_ACCENT },
      tableRow: { borderColor: LEDGER_HAIRLINE },
      tableCol: { borderColor: LEDGER_HAIRLINE },
      signatureLine: { borderTopColor: LEDGER_ACCENT },
      footer: {
        bottom: 36,
        left: 34,
        right: 34,
        borderTop: `1px solid ${LEDGER_HAIRLINE}`,
      },
    }),
    decoration: (
      <>
        <View
          fixed
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: LEDGER_ACCENT,
          }}
        />
        <View
          fixed
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: LEDGER_ACCENT,
          }}
        />
      </>
    ),
  },
} as const satisfies Record<VariantTemplateName, VariantDefinition>;

export function VariantInvoicePdfTemplate({
  variant,
  invoiceData,
  qrCodeDataUrl,
}: {
  variant: VariantTemplateName;
  invoiceData: InvoiceData;
  qrCodeDataUrl?: string;
}) {
  const { styles, decoration } = VARIANTS[variant];

  const invoiceNumberLabel = invoiceData?.invoiceNumberObject?.label;
  const invoiceNumberValue = invoiceData?.invoiceNumberObject?.value;
  const invoiceDocTitle = `${invoiceNumberLabel} ${invoiceNumberValue}`;

  return (
    <Document title={invoiceDocTitle}>
      <Page size="A4" style={styles.page}>
        {decoration}
        <InvoiceBody
          invoiceData={invoiceData}
          styles={styles}
          qrCodeDataUrl={qrCodeDataUrl}
        />
      </Page>
    </Document>
  );
}
