import { notFound } from "next/navigation"
import { Suspense } from "react"

import { HttpTypes } from "@medusajs/types"
import { OptionValueIds } from "@lib/util/product-option-filters"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
  optionValueIds,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (cat: HttpTypes.StoreProductCategory) => {
    if (cat.parent_category) {
      parents.push(cat.parent_category)
      getParents(cat.parent_category)
    }
  }

  getParents(category)

  return (
    <div
      className="py-10 sm:py-14 content-container"
      data-testid="category-container"
    >
      <div className="mb-8 border-b-2 border-creata-ink pb-5">
        <span className="zine-sticker bg-creata-mint px-3 py-1 font-mono text-[11px] font-bold uppercase text-creata-ink -rotate-1">
          Category // CREATA 3D
        </span>
        <div className="mt-3 flex flex-wrap items-baseline gap-3">
          {parents.map((parent) => (
            <span
              key={parent.id}
              className="font-display font-extrabold uppercase text-2xl sm:text-4xl text-creata-muted flex items-center gap-3"
            >
              <LocalizedClientLink
                className="hover:text-creata-ink transition-colors"
                href={`/categories/${parent.handle}`}
                data-testid="sort-by-link"
              >
                {parent.name}
              </LocalizedClientLink>
              <span aria-hidden="true">/</span>
            </span>
          ))}
          <h1
            className="font-display font-extrabold uppercase text-4xl sm:text-5xl tracking-tight text-creata-ink leading-none"
            data-testid="category-page-title"
          >
            {category.name}
          </h1>
        </div>
        {category.description && (
          <p className="mt-3 max-w-2xl text-base text-creata-muted">
            {category.description}
          </p>
        )}
        {category.category_children && category.category_children.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {category.category_children.map((c) => (
              <li key={c.id}>
                <LocalizedClientLink
                  href={`/categories/${c.handle}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border-[1.5px] border-creata-ink bg-white hover:bg-creata-yellow shadow-zine-sm font-mono text-xs font-bold uppercase text-creata-ink transition-colors"
                >
                  <span>{c.name}</span>
                  <span aria-hidden="true">↗</span>
                </LocalizedClientLink>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col small:flex-row small:items-start gap-7">
        <RefinementList
          sortBy={sort}
          data-testid="sort-by-container"
          hideOptionsPicker
        />
        <div className="w-full min-w-0">
          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={category.products?.length ?? 8}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryId={category.id}
              countryCode={countryCode}
              optionValueIds={optionValueIds}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
