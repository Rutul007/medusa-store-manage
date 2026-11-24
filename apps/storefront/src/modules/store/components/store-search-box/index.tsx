"use client"

import { MagnifyingGlass, XMarkMini } from "@medusajs/icons"
import { useCallback, useEffect, useRef, useState } from "react"
import { useSearchBox } from "react-instantsearch"

const DEBOUNCE_MS = 250

const StoreSearchBox = () => {
  const timer = useRef<number | undefined>(undefined)
  const [draftQuery, setDraftQuery] = useState<string | null>(null)

  const queryHook = useCallback(
    (nextQuery: string, search: (value: string) => void) => {
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => {
        search(nextQuery)
        setDraftQuery(null)
      }, DEBOUNCE_MS)
    },
    []
  )

  const { query, refine } = useSearchBox({ queryHook })

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const inputValue = draftQuery ?? query

  const clear = () => {
    window.clearTimeout(timer.current)
    setDraftQuery(null)
    refine("")
  }

  return (
    <div className="mb-6 flex items-center gap-x-3 border-2 border-creata-ink bg-white px-4 shadow-zine-sm focus-within:bg-creata-yellow/35 transition-colors">
      <MagnifyingGlass className="shrink-0 text-creata-ink" />
      <input
        type="search"
        value={inputValue}
        onChange={(event) => {
          const next = event.target.value
          setDraftQuery(next)
          refine(next)
        }}
        placeholder="SEARCH 3D PRINTED OBJECTS..."
        aria-label="Search products"
        className="w-full bg-transparent py-3 font-mono text-xs font-bold text-creata-ink outline-none placeholder:text-creata-muted [&::-webkit-search-cancel-button]:hidden"
        data-testid="store-search-input"
      />
      {inputValue && (
        <button
          type="button"
          onClick={clear}
          aria-label="Clear search"
          className="shrink-0 w-7 h-7 border-[1.5px] border-creata-ink bg-creata-cream hover:bg-creata-coral text-creata-ink grid place-items-center transition-colors"
          data-testid="store-search-clear"
        >
          <XMarkMini />
        </button>
      )}
    </div>
  )
}

export default StoreSearchBox
