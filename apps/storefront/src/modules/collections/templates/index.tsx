import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"
import { OptionValueIds } from "@lib/util/product-option-filters"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
  optionValueIds,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="py-10 sm:py-14 content-container">
      <div className="mb-8 border-b-2 border-creata-ink pb-5">
        <span className="zine-sticker bg-creata-yellow px-3 py-1 font-mono text-[11px] font-bold uppercase text-creata-ink -rotate-1">
          Collection // CREATA 3D
        </span>
        <h1 className="mt-3 font-display font-extrabold uppercase text-4xl sm:text-5xl tracking-tight text-creata-ink leading-none">
          {collection.title}
        </h1>
      </div>

      <div className="flex flex-col small:flex-row small:items-start gap-7">
        <RefinementList sortBy={sort} hideOptionsPicker />
        <div className="w-full min-w-0">
          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={collection.products?.length}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              collectionId={collection.id}
              countryCode={countryCode}
              optionValueIds={optionValueIds}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
