import { getProductPrice } from "@lib/util/get-product-price"
import { getPersonalizationSettings } from "@lib/util/personalization"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

const STAGE_BACKDROPS = [
  "bg-creata-mint-soft",
  "bg-creata-yellow-soft",
  "bg-creata-lilac-soft",
  "bg-creata-peach-soft",
]

const pickStageBackdrop = (seed: string, index?: number) => {
  if (typeof index === "number") {
    return STAGE_BACKDROPS[index % STAGE_BACKDROPS.length]
  }
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 997
  }
  return STAGE_BACKDROPS[hash % STAGE_BACKDROPS.length]
}

export default async function ProductPreview({
  product,
  index,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  index?: number
}) {
  const { cheapestPrice } = getProductPrice({ product })
  const isCustomizable = Boolean(getPersonalizationSettings(product))
  const isOnSale = cheapestPrice?.price_type === "sale"
  const stageBg = pickStageBackdrop(product.id || product.handle || "", index)

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group bg-white border-2 border-creata-ink shadow-zine-md p-3 sm:p-3.5 flex flex-col gap-3.5 h-full transition-all duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0_#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-creata-ink focus-visible:ring-offset-2 focus-visible:ring-offset-creata-cream"
      aria-label={`View ${product.title}`}
    >
      <div
        className={`relative aspect-square border-2 border-creata-ink overflow-hidden ${stageBg}`}
        data-testid="product-wrapper"
      >
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          alt={product.title}
          size="square"
          className="h-full w-full"
        />

        {isCustomizable ? (
          <span className="zine-sticker bg-creata-mint text-creata-ink absolute top-2.5 left-2.5 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase -rotate-2">
            Custom!
          </span>
        ) : isOnSale ? (
          <span className="zine-sticker bg-creata-coral text-white absolute top-2.5 left-2.5 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase -rotate-2">
            Sale!
          </span>
        ) : null}

        <span
          className="absolute right-2.5 bottom-2.5 px-2 py-0.5 border-[1.5px] border-creata-ink bg-white group-hover:bg-creata-yellow font-mono text-xs font-bold text-creata-ink transition-colors"
          aria-hidden="true"
        >
          ↗
        </span>
      </div>

      <div className="flex flex-col gap-2.5 flex-1 justify-between">
        <div>
          <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-creata-muted truncate">
            {product.collection?.title || "CREATA OBJECT"}
          </span>
          <h3
            className="mt-1 font-display font-extrabold text-[15px] sm:text-[17px] leading-snug text-creata-ink line-clamp-2"
            data-testid="product-title"
          >
            {product.title}
          </h3>
        </div>

        <div className="pt-2.5 border-t-2 border-dashed border-creata-ink flex items-center justify-between gap-2">
          {cheapestPrice ? (
            <PreviewPrice price={cheapestPrice} />
          ) : (
            <span className="font-mono text-xs font-bold text-creata-muted">
              VIEW
            </span>
          )}
          <span className="px-2 py-0.5 border-[1.5px] border-creata-ink bg-creata-mint group-hover:bg-creata-coral font-mono text-[10px] font-bold uppercase text-creata-ink transition-colors">
            Inspect
          </span>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
