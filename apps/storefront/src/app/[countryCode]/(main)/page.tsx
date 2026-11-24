import { Metadata } from "next"

import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import { getPersonalizationSettings } from "@lib/util/personalization"
import { toJsonLd } from "@lib/util/product-structured-data"
import { getSiteOrigin, listCountryCodes, STORE_NAME } from "@lib/util/site"
import { buildRegionsReturnPolicies } from "@lib/util/store-policies"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import ProductPreview from "@modules/products/components/product-preview"

export const revalidate = 60

export async function generateMetadata(props: {
  params: Promise<{ countryCode: string }>
}): Promise<Metadata> {
  const { countryCode } = await props.params
  const [origin, regions] = await Promise.all([getSiteOrigin(), listRegions()])

  return {
    title: "CREATA 3D | Objects for curious spaces",
    description:
      "Discover thoughtful 3D printed objects, designed with curiosity and made for everyday life.",
    alternates: {
      canonical: `${origin}/${countryCode}`,
      languages: {
        ...Object.fromEntries(
          listCountryCodes(regions).map((code) => [
            `en-${code.toUpperCase()}`,
            `${origin}/${code}`,
          ])
        ),
        "x-default": origin,
      },
    },
  }
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const [{ collections }, { response: latestResponse }, origin, regions] =
    await Promise.all([
      listCollections({ fields: "id, handle, title" }),
      listProducts({
        regionId: region.id,
        queryParams: { limit: 8 },
      }),
      getSiteOrigin(),
      listRegions(),
    ])

  const latestProducts = latestResponse.products ?? []
  const hasCollectionProducts = latestProducts.some((product) =>
    Boolean(product.collection_id)
  )
  const personalizableProduct = latestProducts.find((product) =>
    Boolean(getPersonalizationSettings(product))
  )
  const personalizationSettings = personalizableProduct
    ? getPersonalizationSettings(personalizableProduct)
    : null

  const homeUrl = `${origin}/${countryCode}`
  const returnPolicies = buildRegionsReturnPolicies(regions)
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: STORE_NAME,
      url: origin,
      ...(returnPolicies.length
        ? { hasMerchantReturnPolicy: returnPolicies }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: STORE_NAME,
      url: homeUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${homeUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ]

  const tickerItems = [
    "LAYER BY LAYER",
    "CUSTOM EMBOSSED PRINTS",
    "NO BORING DESKS",
    "THOUGHTFUL 3D OBJECTS",
    "CREATA 3D STUDIO",
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(structuredData) }}
      />
      <div>
        <Hero featuredProducts={latestProducts} />

        {/* High-Contrast Black Ticker */}
        <div
          className="creata-ticker border-y-2 border-creata-ink bg-creata-ink text-creata-yellow py-3"
          aria-label="What makes CREATA 3D different"
        >
          <div className="creata-ticker__track font-mono text-xs font-bold uppercase tracking-[0.1em]">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={index} className="inline-flex items-center gap-6">
                <span>{item}</span>
                <span className="text-creata-mint" aria-hidden="true">
                  ◆
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Catalog & Collection Rails */}
        <section id="objects" className="py-12 sm:py-16">
          <div className="content-container mb-8 pb-5 border-b-2 border-creata-ink flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="zine-sticker bg-creata-lilac px-3 py-1 font-mono text-[11px] font-bold uppercase text-creata-ink rotate-1">
                Catalog // Issue 04
              </span>
              <h2 className="mt-3 font-display font-extrabold uppercase text-3xl sm:text-5xl tracking-tight text-creata-ink leading-none">
                Studio Objects
              </h2>
            </div>
            <LocalizedClientLink
              href="/store"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-creata-ink bg-white hover:bg-creata-yellow font-mono text-xs font-bold uppercase text-creata-ink shadow-zine-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              <span>Shop all objects</span>
              <span aria-hidden="true">↗</span>
            </LocalizedClientLink>
          </div>

          {collections?.length > 0 && hasCollectionProducts ? (
            <ul className="flex flex-col">
              <FeaturedProducts collections={collections} region={region} />
            </ul>
          ) : latestProducts.length > 0 ? (
            <div className="content-container pt-2 pb-6">
              <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-5">
                {latestProducts.map((product, idx) => (
                  <li key={product.id}>
                    <ProductPreview
                      product={product}
                      region={region}
                      isFeatured
                      index={idx}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        {/* PRINT LAB Ticket Spotlight */}
        {personalizableProduct && personalizationSettings && (
          <section className="content-container py-6 sm:py-10">
            <div className="border-2 border-creata-ink bg-white shadow-zine-lg">
              <div className="bg-creata-yellow border-b-2 border-creata-ink px-5 py-3 flex flex-wrap items-center justify-between gap-2 font-mono text-xs font-bold uppercase text-creata-ink">
                <span>PRINT LAB // CUSTOM RELIEF WORKBENCH</span>
                <span>MAX {personalizationSettings.maxLength} CHARS</span>
              </div>

              <div className="p-6 sm:p-9 grid grid-cols-1 small:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
                <div className="zine-blueprint border-2 border-creata-ink p-6 flex flex-col justify-between min-h-[240px]">
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase text-creata-ink">
                    <span>PROOF PREVIEW</span>
                    <span>MADE TO ORDER</span>
                  </div>

                  <div className="my-6 flex items-center justify-center">
                    <div className="px-7 py-3.5 bg-creata-yellow border-[3px] border-creata-ink shadow-zine font-display font-extrabold text-2xl sm:text-3xl tracking-wide uppercase text-creata-ink">
                      {personalizationSettings.placeholder || "CREATA"}
                    </div>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase text-creata-ink">
                    <span className="truncate">{personalizableProduct.title}</span>
                    <span>CREATA 3D</span>
                  </div>
                </div>

                <div>
                  <span className="zine-sticker bg-creata-mint px-3 py-1 font-mono text-[11px] font-bold uppercase text-creata-ink -rotate-1">
                    Interactive Customizer
                  </span>
                  <h2 className="mt-4 font-display font-extrabold uppercase text-3xl sm:text-4xl tracking-tight text-creata-ink leading-[1.04]">
                    Stamp your own 3D print.
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-creata-muted leading-relaxed">
                    {personalizationSettings.question} Preview your custom text live on the product page before adding it to your Print Bag.
                  </p>
                  <div className="mt-6">
                    <LocalizedClientLink
                      href={`/products/${personalizableProduct.handle}`}
                      className="inline-flex items-center gap-3 px-6 py-3.5 border-2 border-creata-ink bg-creata-coral text-creata-ink font-mono text-xs sm:text-sm font-bold uppercase shadow-zine hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111111] transition-all"
                    >
                      <span>Customize {personalizableProduct.title}</span>
                      <span aria-hidden="true">↗</span>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Bold Studio CTA Banner */}
        <section className="content-container pt-6 pb-20">
          <div className="border-2 border-creata-ink bg-creata-ink text-creata-yellow shadow-zine-lg px-7 py-12 sm:px-12 sm:py-16 flex flex-col small:flex-row small:items-end justify-between gap-8">
            <div className="max-w-[600px]">
              <span className="inline-block px-3 py-1 bg-creata-mint text-creata-ink border-2 border-creata-ink font-mono text-[11px] font-bold uppercase -rotate-1">
                CREATA 3D // STUDIO
              </span>
              <h2 className="mt-4 font-display font-extrabold uppercase text-4xl sm:text-6xl tracking-tight leading-[0.96] text-white">
                Bring home a{" "}
                <span className="text-creata-yellow">better idea.</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/80 max-w-[460px] leading-relaxed">
                Explore the full catalog of sculptural pieces, desk companions, and custom-stamped 3D prints.
              </p>
            </div>
            <LocalizedClientLink
              href="/store"
              className="inline-flex items-center gap-3 px-6 py-4 border-2 border-creata-yellow bg-creata-yellow hover:bg-creata-mint hover:border-creata-mint text-creata-ink font-mono text-xs sm:text-sm font-bold uppercase shadow-[4px_4px_0_#FF5E3A] transition-all self-start small:self-auto"
            >
              <span>Explore all objects</span>
              <span aria-hidden="true">↗</span>
            </LocalizedClientLink>
          </div>
        </section>
      </div>
    </>
  )
}
