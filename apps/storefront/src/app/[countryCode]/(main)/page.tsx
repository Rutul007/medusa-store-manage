import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion, listRegions } from "@lib/data/regions"
import { toJsonLd } from "@lib/util/product-structured-data"
import { getSiteOrigin, listCountryCodes, STORE_NAME } from "@lib/util/site"
import { buildRegionsReturnPolicies } from "@lib/util/store-policies"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

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

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!region) {
    return null
  }

  const [origin, regions] = await Promise.all([getSiteOrigin(), listRegions()])
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(structuredData) }}
      />
      <div className="brand-home">
        <Hero />
        <section className="brand-promise" aria-label="What makes CREATA 3D different">
          <span>Designed in our studio</span><span className="brand-promise__mark">+</span>
          <span>Printed with purpose</span><span className="brand-promise__mark">+</span>
          <span>Made for real life</span>
        </section>
        <section className="brand-story">
          <div className="brand-story__label"><span>01 / OUR POINT OF VIEW</span><span>THE CREATA WAY</span></div>
          <div className="brand-story__body">
            <h2>Good design should<br />make you <em>feel something.</em></h2>
            <div className="brand-story__aside">
              <p>We turn digital ideas into tangible little joys. Each piece is considered, made to order, and finished right here in our studio.</p>
              <LocalizedClientLink href="/store" className="text-link">Find your next favourite <span aria-hidden="true">&#8599;</span></LocalizedClientLink>
            </div>
          </div>
        </section>
        {collections?.length > 0 && (
          <section className="brand-collections">
            <div className="brand-section-heading">
              <div><p className="eyebrow">THE OBJECTS</p><h2>Made to make a space.</h2></div>
              <LocalizedClientLink href="/store" className="text-link">Shop all objects <span aria-hidden="true">&#8599;</span></LocalizedClientLink>
            </div>
            <ul className="flex flex-col gap-x-6">
              <FeaturedProducts collections={collections} region={region} />
            </ul>
          </section>
        )}
        <section className="brand-cta">
          <p className="eyebrow">A LITTLE DIFFERENT, BY DESIGN</p>
          <h2>Bring home a<br /><em>better idea.</em></h2>
          <LocalizedClientLink href="/store" className="button button--paper">See what we make <span aria-hidden="true">&#8599;</span></LocalizedClientLink>
          <span className="brand-cta__orb" aria-hidden="true" />
        </section>
      </div>
    </>
  )
}
