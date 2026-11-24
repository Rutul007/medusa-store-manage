import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return (
      <div className="block w-32 h-10 bg-creata-surface border-2 border-creata-ink animate-pulse" />
    )
  }

  return (
    <div className="flex flex-col items-start text-creata-ink">
      <span
        className={clx(
          "px-3 py-1 bg-creata-yellow border-2 border-creata-ink shadow-zine-sm font-mono text-2xl font-bold tracking-tight",
          {
            "text-creata-coral": selectedPrice.price_type === "sale",
          }
        )}
      >
        {!variant && (
          <span className="text-xs uppercase mr-1.5">From</span>
        )}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>
      {selectedPrice.price_type === "sale" && (
        <div className="mt-2 flex items-center gap-2 font-mono text-xs font-bold">
          <span className="text-creata-muted">
            WAS{" "}
            <span
              className="line-through"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
          </span>
          <span className="px-2 py-0.5 border border-creata-ink bg-creata-coral text-white">
            -{selectedPrice.percentage_diff}%
          </span>
        </div>
      )}
    </div>
  )
}
