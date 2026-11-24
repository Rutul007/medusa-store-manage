"use client"

import { usePagination } from "react-instantsearch"

import { clx } from "@modules/common/components/ui"

const SearchPagination = () => {
  const { pages, currentRefinement, nbPages, refine } = usePagination({
    padding: 2,
  })

  if (nbPages <= 1) {
    return null
  }

  const renderPage = (page: number) => {
    const isCurrent = page === currentRefinement
    return (
      <button
        key={page}
        type="button"
        className={clx(
          "w-10 h-10 border-2 border-creata-ink font-mono text-xs font-bold transition-all",
          {
            "bg-creata-ink text-creata-yellow": isCurrent,
            "bg-white text-creata-ink shadow-zine-sm hover:bg-creata-yellow":
              !isCurrent,
          }
        )}
        disabled={isCurrent}
        onClick={() => refine(page)}
      >
        {page + 1}
      </button>
    )
  }

  const renderEllipsis = (key: string) => (
    <span
      key={key}
      className="px-1.5 font-mono text-sm font-bold text-creata-muted select-none"
    >
      ...
    </span>
  )

  const lastPage = nbPages - 1

  return (
    <div className="flex justify-center w-full mt-12">
      <div className="flex gap-2 items-center" data-testid="product-pagination">
        {!pages.includes(0) && renderPage(0)}
        {!pages.includes(0) && !pages.includes(1) && renderEllipsis("start")}
        {pages.map(renderPage)}
        {!pages.includes(lastPage) &&
          !pages.includes(lastPage - 1) &&
          renderEllipsis("end")}
        {!pages.includes(lastPage) && renderPage(lastPage)}
      </div>
    </div>
  )
}

export default SearchPagination
