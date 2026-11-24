import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import VariantImageGallery from "@modules/products/components/image-gallery/variant-image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { Suspense } from "react"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate = ({
  product,
  region,
  countryCode,
}: ProductTemplateProps) => {
  if (!product?.id) {
    return notFound()
  }

  return (
    <div className="text-creata-ink" data-testid="product-container">
      <div className="content-container pb-20">
        <nav
          className="py-5 flex items-center gap-2.5 overflow-hidden font-mono text-xs font-bold uppercase text-creata-muted whitespace-nowrap"
          aria-label="Breadcrumb"
        >
          <LocalizedClientLink
            href="/store"
            className="hover:text-creata-ink hover:underline transition-colors"
          >
            All Objects
          </LocalizedClientLink>
          <span aria-hidden="true">/</span>
          {product.collection ? (
            <LocalizedClientLink
              href={`/collections/${product.collection.handle}`}
              className="hover:text-creata-ink hover:underline transition-colors"
            >
              {product.collection.title}
            </LocalizedClientLink>
          ) : (
            <span>CREATA 3D</span>
          )}
          <span aria-hidden="true">/</span>
          <span className="truncate text-creata-ink">{product.title}</span>
        </nav>

        <section
          className="grid grid-cols-1 small:grid-cols-[1.12fr_0.88fr] gap-8 sm:gap-10 medium:gap-14 items-start"
          aria-label={product.title}
        >
          <div className="min-w-0 small:sticky small:top-24">
            <VariantImageGallery product={product} />
            <div className="mt-3 flex items-center justify-between gap-3 px-1 font-mono text-[11px] font-bold uppercase tracking-wider text-creata-muted">
              <span>STUDIO PROOF // OBJECT STUDY</span>
              <span>LAYER BY LAYER</span>
            </div>
          </div>

          <div className="min-w-0 small:sticky small:top-24 flex flex-col gap-6">
            <div>
              <span className="zine-sticker bg-creata-lilac px-3 py-1 font-mono text-[10px] font-bold uppercase text-creata-ink -rotate-1">
                {product.collection?.title || "CREATA OBJECT"}
              </span>
              <ProductInfo product={product} />
            </div>

            <div className="flex items-center gap-2.5 py-3 border-y-2 border-dashed border-creata-ink font-mono text-xs font-bold uppercase text-creata-ink">
              <span aria-hidden="true">◆</span>
              <span>Designed with curiosity. Extruded to keep.</span>
            </div>

            <ProductActions product={product} region={region} />

            <div className="grid grid-cols-2 gap-3">
              <LocalizedClientLink
                href="/shipping"
                className="flex items-center justify-between px-4 py-3 border-2 border-creata-ink bg-white hover:bg-creata-yellow shadow-zine-sm font-mono text-xs font-bold uppercase text-creata-ink transition-colors"
              >
                <span>Shipping Info</span>
                <span aria-hidden="true">↗</span>
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/returns"
                className="flex items-center justify-between px-4 py-3 border-2 border-creata-ink bg-white hover:bg-creata-yellow shadow-zine-sm font-mono text-xs font-bold uppercase text-creata-ink transition-colors"
              >
                <span>Returns Policy</span>
                <span aria-hidden="true">↗</span>
              </LocalizedClientLink>
            </div>

            <ProductTabs product={product} />
          </div>
        </section>

        <section
          className="mt-16 sm:mt-20 border-2 border-creata-ink bg-creata-ink text-creata-yellow shadow-zine-lg p-8 sm:p-12 grid grid-cols-1 small:grid-cols-[1.15fr_0.85fr] gap-6 items-end"
          aria-label="About CREATA 3D"
        >
          <div>
            <span className="inline-block px-3 py-1 bg-creata-mint text-creata-ink border-2 border-creata-ink font-mono text-[11px] font-bold uppercase -rotate-1">
              Note From The Studio
            </span>
            <h2 className="mt-4 font-display font-extrabold uppercase text-3xl sm:text-5xl tracking-tight leading-[1] text-white">
              Objects with a little more{" "}
              <span className="text-creata-yellow">intention.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-white/80 max-w-[420px]">
            CREATA 3D turns digital ideas into bold everyday pieces—honest layer lines, tactile surfaces, and room for your own character.
          </p>
        </section>

        <section
          className="pt-16 sm:pt-20"
          data-testid="related-products-container"
        >
          <div className="mb-8 pb-4 border-b-2 border-creata-ink flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="zine-sticker bg-creata-yellow px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-creata-ink -rotate-1">
                Keep Exploring
              </span>
              <h2 className="mt-2 font-display font-extrabold uppercase text-3xl sm:text-4xl tracking-tight text-creata-ink">
                More Studio Objects
              </h2>
            </div>
            <LocalizedClientLink
              href="/store"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-creata-ink bg-white hover:bg-creata-mint shadow-zine-sm font-mono text-xs font-bold uppercase text-creata-ink transition-colors"
            >
              <span>Shop all objects</span>
              <span aria-hidden="true">↗</span>
            </LocalizedClientLink>
          </div>
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </section>
      </div>
    </div>
  )
}

export default ProductTemplate
