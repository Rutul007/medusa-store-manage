import { getProductPrice } from "@lib/util/get-product-price"
import { getPersonalizationSettings } from "@lib/util/personalization"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PreviewPrice from "@modules/products/components/product-preview/price"
import Thumbnail from "@modules/products/components/thumbnail"

type HeroProps = {
  featuredProducts: HttpTypes.StoreProduct[]
}

const Hero = ({ featuredProducts }: HeroProps) => {
  const primaryProduct = featuredProducts[0]
  const secondaryProduct =
    featuredProducts.find(
      (product) =>
        product.id !== primaryProduct?.id &&
        Boolean(getPersonalizationSettings(product))
    ) ?? featuredProducts[1]

  const primaryPrice = primaryProduct
    ? getProductPrice({ product: primaryProduct }).cheapestPrice
    : null
  const isSecondaryCustom = secondaryProduct
    ? Boolean(getPersonalizationSettings(secondaryProduct))
    : false

  return (
    <section className="content-container pt-10 pb-14 small:pt-12 small:pb-16">
      <div className="grid grid-cols-1 small:grid-cols-[1.08fr_0.92fr] gap-10 medium:gap-14 items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="zine-sticker bg-creata-yellow px-3 py-1 font-mono text-[11px] font-bold uppercase text-creata-ink -rotate-2">
              Custom Names!
            </span>
            <span className="zine-sticker bg-creata-mint px-3 py-1 font-mono text-[11px] font-bold uppercase text-creata-ink rotate-1">
              Studio Drop 04
            </span>
            <span className="zine-sticker bg-creata-coral px-3 py-1 font-mono text-[11px] font-bold uppercase text-white -rotate-1">
              3D Printed
            </span>
          </div>

          <h1 className="font-display font-extrabold uppercase text-[42px] sm:text-[58px] medium:text-[74px] leading-[0.94] tracking-[-0.03em] text-creata-ink">
            We print <span className="zine-mark">weirdly</span> good things.
          </h1>

          <p className="mt-5 max-w-[490px] text-base sm:text-[17px] leading-relaxed text-creata-muted font-medium">
            Artistic 3D printed objects for desks, shelves, and gifts. Bold silhouettes, honest layer textures, and custom-named pieces extruded straight to order.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <LocalizedClientLink
              href="/store"
              className="inline-flex items-center gap-3 px-6 py-3.5 border-2 border-creata-ink bg-creata-coral text-creata-ink font-mono text-xs sm:text-sm font-bold uppercase shadow-zine hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111111] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_#111111] transition-all"
            >
              <span>Explore Objects</span>
              <span aria-hidden="true">↗</span>
            </LocalizedClientLink>
            <a
              href="#objects"
              className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-creata-ink bg-white hover:bg-creata-yellow text-creata-ink font-mono text-xs sm:text-sm font-bold uppercase shadow-zine hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111111] transition-all"
            >
              <span>Browse Drop</span>
            </a>
          </div>
        </div>

        {/* Framed Studio Proof Window */}
        <div className="bg-creata-lilac border-2 border-creata-ink shadow-zine-lg p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 pb-3 border-b-2 border-creata-ink font-mono text-[11px] font-bold uppercase text-creata-ink">
            <span>STUDIO PROOF // LIVE DROP</span>
            <span className="truncate max-w-[55%]">
              {primaryProduct?.title || "CREATA 3D"}
            </span>
          </div>

          <LocalizedClientLink
            href={
              primaryProduct ? `/products/${primaryProduct.handle}` : "/store"
            }
            className="group relative block bg-creata-cream border-2 border-creata-ink my-4 p-5"
          >
            <span
              className="absolute top-2 left-2.5 font-mono text-sm font-bold leading-none text-creata-ink"
              aria-hidden="true"
            >
              +
            </span>
            <span
              className="absolute top-2 right-2.5 font-mono text-sm font-bold leading-none text-creata-ink"
              aria-hidden="true"
            >
              +
            </span>
            <span
              className="absolute bottom-2 left-2.5 font-mono text-sm font-bold leading-none text-creata-ink"
              aria-hidden="true"
            >
              +
            </span>
            <span
              className="absolute bottom-2 right-2.5 font-mono text-sm font-bold leading-none text-creata-ink"
              aria-hidden="true"
            >
              +
            </span>

            <div className="relative aspect-[4/3] w-full overflow-hidden border-[1.5px] border-creata-ink bg-creata-yellow-soft">
              <Thumbnail
                thumbnail={primaryProduct?.thumbnail}
                images={primaryProduct?.images}
                alt={primaryProduct?.title || "Featured CREATA 3D object"}
                size="square"
                className="h-full w-full"
              />
            </div>
          </LocalizedClientLink>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              {primaryPrice ? (
                <PreviewPrice price={primaryPrice} />
              ) : (
                <span className="px-2.5 py-1 bg-creata-yellow border-[1.5px] border-creata-ink font-mono text-xs font-bold">
                  CREATA 3D
                </span>
              )}
              {secondaryProduct && (
                <LocalizedClientLink
                  href={`/products/${secondaryProduct.handle}`}
                  className="px-2.5 py-1 border-[1.5px] border-creata-ink bg-white hover:bg-creata-mint font-mono text-[11px] font-bold uppercase text-creata-ink transition-colors"
                >
                  {isSecondaryCustom ? "CUSTOMIZABLE ↗" : "NEXT OBJECT ↗"}
                </LocalizedClientLink>
              )}
            </div>

            <LocalizedClientLink
              href={
                primaryProduct ? `/products/${primaryProduct.handle}` : "/store"
              }
              className="px-3.5 py-1.5 border-[1.5px] border-creata-ink bg-creata-yellow shadow-zine-sm hover:bg-creata-mint font-mono text-xs font-bold uppercase text-creata-ink transition-colors"
            >
              Inspect ↗
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
