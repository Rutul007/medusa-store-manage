import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
    },
  })

  if (!pricedProducts?.length) {
    return null
  }

  return (
    <div className="content-container py-8 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6 pb-4 border-b-2 border-dashed border-creata-ink">
        <div>
          <span className="zine-sticker bg-creata-yellow px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-creata-ink -rotate-1">
            Collection
          </span>
          <h3 className="mt-2 font-display font-extrabold uppercase text-2xl sm:text-4xl tracking-tight text-creata-ink">
            {collection.title}
          </h3>
        </div>
        <LocalizedClientLink
          href={`/collections/${collection.handle}`}
          className="inline-flex items-center gap-2 px-4 py-2 border-[1.5px] border-creata-ink bg-white hover:bg-creata-mint font-mono text-xs font-bold uppercase text-creata-ink shadow-zine-sm transition-colors"
        >
          <span>View all</span>
          <span aria-hidden="true">↗</span>
        </LocalizedClientLink>
      </div>

      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-5">
        {pricedProducts.map((product, idx) => (
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
  )
}
