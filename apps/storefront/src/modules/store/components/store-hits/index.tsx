"use client"

import type { Hit } from "instantsearch.js"
import { useHits, useInstantSearch } from "react-instantsearch"

import useSearchSettled from "@lib/hooks/use-search-settled"
import { priceAttribute } from "@lib/search-client"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@modules/common/components/ui"
import Thumbnail from "@modules/products/components/thumbnail"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import SearchPagination from "./pagination"
import HitPrice, { HitPricing } from "./price"

type ProductHit = Hit<
  {
    title: string | null
    handle: string | null
    thumbnail: string | null
  } & HitPricing
>

type StoreHitsProps = {
  hitsPerPage: number
  currencyCode: string
}

const STAGE_BACKDROPS = [
  "bg-creata-mint-soft",
  "bg-creata-yellow-soft",
  "bg-creata-lilac-soft",
  "bg-creata-peach-soft",
]

const StoreHits = ({ hitsPerPage, currencyCode }: StoreHitsProps) => {
  const { items } = useHits<ProductHit>()
  const { status, error } = useInstantSearch()
  const { isSearching, hasNoResultsYet } = useSearchSettled()

  if (status === "error") {
    return (
      <div
        className="border-2 border-creata-ink bg-white shadow-zine p-10 text-center"
        data-testid="products-error"
      >
        <Text className="text-rose-700 font-bold font-mono text-xs uppercase">
          Couldn&apos;t load objects
          {error?.message ? `: ${error.message}` : "."}
        </Text>
      </div>
    )
  }

  return (
    <>
      {hasNoResultsYet ? (
        <SkeletonProductGrid numberOfProducts={hitsPerPage} />
      ) : !items.length ? (
        <div
          className="border-2 border-creata-ink bg-white shadow-zine p-12 text-center"
          data-testid="no-products"
        >
          <p className="font-display font-extrabold text-xl uppercase text-creata-ink">
            No objects matched these filters.
          </p>
          <p className="text-sm text-creata-muted mt-1">
            Try clearing a filter or searching for another keyword.
          </p>
        </div>
      ) : (
        <ul
          className={`grid grid-cols-2 w-full small:grid-cols-3 gap-5 transition-opacity duration-150 ${
            isSearching ? "opacity-60" : "opacity-100"
          }`}
          data-testid="products-list"
        >
          {items.map((hit, idx) => {
            if (!hit.handle) {
              return null
            }

            const onSale = hit[priceAttribute("on_sale", currencyCode)] === true
            const stageBg = STAGE_BACKDROPS[idx % STAGE_BACKDROPS.length]

            return (
              <li key={hit.objectID}>
                <LocalizedClientLink
                  href={`/products/${hit.handle}`}
                  className="group bg-white border-2 border-creata-ink shadow-zine-md p-3 sm:p-3.5 flex flex-col gap-3.5 h-full transition-all duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0_#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-creata-ink"
                >
                  <div
                    className={`relative aspect-square border-2 border-creata-ink overflow-hidden ${stageBg}`}
                    data-testid="product-wrapper"
                  >
                    <Thumbnail
                      thumbnail={hit.thumbnail}
                      size="square"
                      className="h-full w-full"
                    />
                    {onSale && (
                      <span className="zine-sticker bg-creata-coral text-white absolute top-2.5 left-2.5 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase -rotate-2">
                        Sale!
                      </span>
                    )}
                    <span
                      className="absolute right-2.5 bottom-2.5 px-2 py-0.5 border-[1.5px] border-creata-ink bg-white group-hover:bg-creata-yellow font-mono text-xs font-bold text-creata-ink transition-colors"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5 flex-1 justify-between">
                    <div>
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-creata-muted">
                        CREATA OBJECT
                      </span>
                      <Text
                        className="mt-1 font-display font-extrabold text-[15px] sm:text-[17px] leading-snug text-creata-ink line-clamp-2"
                        data-testid="product-title"
                      >
                        {hit.title}
                      </Text>
                    </div>

                    <div className="pt-2.5 border-t-2 border-dashed border-creata-ink flex items-center justify-between gap-2">
                      <HitPrice hit={hit} currencyCode={currencyCode} />
                      <span className="px-2 py-0.5 border-[1.5px] border-creata-ink bg-creata-mint group-hover:bg-creata-coral font-mono text-[10px] font-bold uppercase text-creata-ink transition-colors">
                        Inspect
                      </span>
                    </div>
                  </div>
                </LocalizedClientLink>
              </li>
            )
          })}
        </ul>
      )}
      <SearchPagination />
    </>
  )
}

export default StoreHits
