"use client"

import type { SearchClient } from "instantsearch.js"
import { useState } from "react"
import { Configure, InstantSearch } from "react-instantsearch"

import { PRODUCT_INDEX_NAME, searchClient } from "@lib/search-client"
import StoreHits from "@modules/store/components/store-hits"
import StoreRefinements from "@modules/store/components/store-refinements"
import StoreSearchBox from "@modules/store/components/store-search-box"

const PRODUCT_LIMIT = 12

const StoreTemplate = ({ currencyCode }: { currencyCode: string }) => {
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div
      className="py-10 sm:py-14 content-container"
      data-testid="category-container"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-creata-ink pb-5">
        <div>
          <span className="zine-sticker bg-creata-lilac px-3 py-1 font-mono text-[11px] font-bold uppercase text-creata-ink -rotate-1">
            Catalog // CREATA 3D
          </span>
          <h1
            className="mt-3 font-display font-extrabold uppercase text-4xl sm:text-5xl tracking-tight text-creata-ink leading-none"
            data-testid="store-page-title"
          >
            All Objects
          </h1>
        </div>
        <button
          type="button"
          onClick={() => setFiltersOpen((prev) => !prev)}
          aria-expanded={filtersOpen}
          className="small:hidden inline-flex items-center gap-2 px-4 py-2 border-2 border-creata-ink bg-creata-yellow shadow-zine-sm font-mono text-xs font-bold uppercase text-creata-ink"
        >
          <span>{filtersOpen ? "Hide Filters" : "Filters & Sort"}</span>
        </button>
      </div>

      <InstantSearch
        indexName={PRODUCT_INDEX_NAME}
        searchClient={searchClient as unknown as SearchClient}
        routing
        future={{ preserveSharedStateOnUnmount: true }}
      >
        <Configure hitsPerPage={PRODUCT_LIMIT} />
        <div className="flex flex-col small:flex-row small:items-start gap-7">
          <aside
            className={`${
              filtersOpen ? "block" : "hidden"
            } small:block small:w-[270px] small:shrink-0 small:sticky small:top-24`}
          >
            <div className="border-2 border-creata-ink bg-white shadow-zine-md p-5">
              <StoreRefinements currencyCode={currencyCode} />
            </div>
          </aside>
          <div className="w-full min-w-0">
            <StoreSearchBox />
            <StoreHits
              hitsPerPage={PRODUCT_LIMIT}
              currencyCode={currencyCode}
            />
          </div>
        </div>
      </InstantSearch>
    </div>
  )
}

export default StoreTemplate
