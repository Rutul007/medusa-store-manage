"use client"

import { useToggleRefinement } from "react-instantsearch"

import { priceAttribute } from "@lib/search-client"

const OnSaleToggle = ({ currencyCode }: { currencyCode: string }) => {
  const { value, refine, canRefine } = useToggleRefinement({
    attribute: priceAttribute("on_sale", currencyCode),
    on: true,
  })

  if (!canRefine) {
    return null
  }

  return (
    <div className="border-t-2 border-dashed border-creata-ink pt-4">
      <label className="flex cursor-pointer items-center gap-x-2.5">
        <input
          type="checkbox"
          checked={value.isRefined}
          onChange={() => refine(value)}
          className="h-4 w-4 shrink-0 border-2 border-creata-ink accent-creata-ink"
          data-testid="on-sale-toggle"
        />
        <span className="font-mono text-xs font-bold uppercase text-creata-ink flex-1">
          On sale only
        </span>
        {typeof value.count === "number" && (
          <span className="font-mono text-[11px] font-bold text-creata-muted">
            [{value.count}]
          </span>
        )}
      </label>
    </div>
  )
}

export default OnSaleToggle
