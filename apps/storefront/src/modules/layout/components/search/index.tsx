"use client"

import { MagnifyingGlass } from "@medusajs/icons"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import type { SearchClient } from "instantsearch.js"
import {
  Configure,
  InstantSearch,
  useHits,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch"

import useSearchSettled from "@lib/hooks/use-search-settled"
import useToggleState from "@lib/hooks/use-toggle-state"
import { PRODUCT_INDEX_NAME, searchClient } from "@lib/search-client"
import { Text } from "@modules/common/components/ui"
import SearchDrawer from "./drawer"
import SearchHit, { ProductHit } from "./hit"

const HITS_PER_PAGE = 12
const DEBOUNCE_MS = 250

const SearchPanel = ({ onNavigate }: { onNavigate: () => void }) => {
  const timer = useRef<number | undefined>(undefined)

  const queryHook = useCallback(
    (nextQuery: string, search: (value: string) => void) => {
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => search(nextQuery), DEBOUNCE_MS)
    },
    []
  )

  const { query, refine } = useSearchBox({ queryHook })
  const { items } = useHits<ProductHit>()
  const { status, error } = useInstantSearch()
  const { isSettled } = useSearchSettled()

  const [inputValue, setInputValue] = useState(query)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const hasInput = Boolean(inputValue.trim())
  const isPending = inputValue.trim() !== query.trim()
  const hasResults = Boolean(query.trim()) && items.length > 0

  return (
    <>
      <div className="p-4 border-b-2 border-creata-ink bg-white">
        <div className="flex items-center gap-x-3 border-2 border-creata-ink bg-creata-cream px-3.5 shadow-zine-sm focus-within:bg-creata-yellow/40">
          <MagnifyingGlass className="shrink-0 text-creata-ink" />
          <input
            type="search"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value)
              refine(event.target.value)
            }}
            placeholder="SEARCH 3D OBJECTS..."
            aria-label="Search products"
            autoFocus
            className="w-full bg-transparent py-2.5 font-mono text-xs font-bold text-creata-ink outline-none placeholder:text-creata-muted"
            data-testid="search-input"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {!hasInput ? (
          <Text
            className="px-4 py-10 text-center font-mono text-xs text-creata-muted uppercase"
            data-testid="search-empty"
          >
            Start typing to search the catalog.
          </Text>
        ) : status === "error" ? (
          <Text
            className="px-4 py-10 text-center text-rose-700 font-semibold"
            data-testid="search-error"
          >
            Couldn&apos;t search products
            {error?.message ? `: ${error.message}` : "."}
          </Text>
        ) : !isSettled ? (
          <Text
            className="px-4 py-10 text-center font-mono text-xs text-creata-muted uppercase"
            data-testid="search-loading"
          >
            Searching&hellip;
          </Text>
        ) : hasResults ? (
          <ul className="flex flex-col gap-2.5" data-testid="search-results">
            {items.map((hit) => (
              <SearchHit key={hit.objectID} hit={hit} onNavigate={onNavigate} />
            ))}
          </ul>
        ) : isPending || !query.trim() ? (
          <Text
            className="px-4 py-10 text-center font-mono text-xs text-creata-muted uppercase"
            data-testid="search-loading"
          >
            Searching&hellip;
          </Text>
        ) : (
          <Text
            className="px-4 py-10 text-center font-mono text-xs text-creata-muted uppercase"
            data-testid="search-no-results"
          >
            No objects found for &quot;{query}&quot;
          </Text>
        )}
      </div>
    </>
  )
}

const Search = () => {
  const { state: isOpen, open, close } = useToggleState()
  const { countryCode } = useParams<{ countryCode: string }>()

  return (
    <>
      <Link
        href={`/${countryCode}/search`}
        onClick={(event) => {
          event.preventDefault()
          open()
        }}
        aria-label="Search products"
        className="inline-flex items-center justify-center w-10 h-10 sm:w-auto sm:px-3.5 sm:py-2 border-[1.5px] border-creata-ink bg-white hover:bg-creata-mint shadow-zine-sm text-creata-ink font-mono text-xs font-bold uppercase gap-2 transition-colors"
        data-testid="nav-search-button"
      >
        <MagnifyingGlass />
        <span className="hidden medium:inline">Search</span>
      </Link>

      <SearchDrawer isOpen={isOpen} close={close}>
        <InstantSearch
          indexName={PRODUCT_INDEX_NAME}
          searchClient={searchClient as unknown as SearchClient}
          future={{ preserveSharedStateOnUnmount: true }}
        >
          <Configure hitsPerPage={HITS_PER_PAGE} />
          <SearchPanel onNavigate={close} />
        </InstantSearch>
      </SearchDrawer>
    </>
  )
}

export default Search
