import { describe, expect, it } from "vitest";

import enMessages from "../../../../../messages/en.json";
import plMessages from "../../../../../messages/pl.json";
import { buildAboutJsonLdGraph } from "../about-json-ld-graph";

describe("buildAboutJsonLdGraph", () => {
  it("should use PL locale for Polish about page", () => {
    const graph = buildAboutJsonLdGraph(
      plMessages as typeof enMessages,
      "pl",
      "https://quayside-invoice.example",
    );
    const serializedGraph = JSON.stringify(graph);
    const parsed = JSON.parse(serializedGraph) as {
      "@graph": Array<Record<string, unknown>>;
    };

    const webPage = parsed["@graph"][0];
    const faqPage = parsed["@graph"][1];
    const breadcrumb = parsed["@graph"][2];

    expect(webPage).toMatchObject({
      "@type": "WebPage",
      "@id": "https://quayside-invoice.example/pl/about#webpage",
      url: "https://quayside-invoice.example/pl/about",
      name: plMessages.Metadata.about.title,
      description: plMessages.Metadata.about.description,
      inLanguage: "pl-PL",
      isPartOf: { "@id": "https://quayside-invoice.example/#website" },
      breadcrumb: { "@id": "https://quayside-invoice.example/pl/about#breadcrumb" },
      mainEntity: { "@id": "https://quayside-invoice.example/pl/about#faq" },
    });

    expect(faqPage).toMatchObject({
      "@type": "FAQPage",
      "@id": "https://quayside-invoice.example/pl/about#faq",
    });

    expect(breadcrumb).toMatchObject({
      "@type": "BreadcrumbList",
      "@id": "https://quayside-invoice.example/pl/about#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Start Invoicing",
          item: "https://quayside-invoice.example/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: plMessages.About.buttons.home,
        },
      ],
    });

    const mainEntity = faqPage.mainEntity as { name: string }[];
    expect(Array.isArray(mainEntity)).toBe(true);
    expect(mainEntity).toHaveLength(9);
    expect(mainEntity[0].name).toBe(plMessages.FAQ.items.whatIs.question);
  });

  it("should use en locale for English about page", () => {
    const graph = buildAboutJsonLdGraph(
      enMessages,
      "en",
      "https://quayside-invoice.example",
    );
    const serializedGraph = JSON.stringify(graph);
    const parsed = JSON.parse(serializedGraph) as {
      "@graph": Array<Record<string, unknown>>;
    };

    const webPage = parsed["@graph"][0];
    const faqPage = parsed["@graph"][1];

    expect(webPage).toMatchObject({
      "@type": "WebPage",
      "@id": "https://quayside-invoice.example/en/about#webpage",
      url: "https://quayside-invoice.example/en/about",
      name: enMessages.Metadata.about.title,
      description: enMessages.Metadata.about.description,
      inLanguage: "en-US",
      mainEntity: { "@id": "https://quayside-invoice.example/en/about#faq" },
    });

    expect(faqPage).toMatchObject({
      "@type": "FAQPage",
      "@id": "https://quayside-invoice.example/en/about#faq",
    });

    const mainEntity = faqPage.mainEntity as { name: string }[];
    expect(Array.isArray(mainEntity)).toBe(true);
    expect(mainEntity).toHaveLength(9);
  });
});
