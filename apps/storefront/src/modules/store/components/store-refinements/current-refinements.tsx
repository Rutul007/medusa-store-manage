"use client"

import { XMarkMini } from "@medusajs/icons"
import { useClearRefinements, useCurrentRefinements } from "react-instantsearch"

import { indexedCurrency, priceAttribute } from "@lib/search-client"
import { convertToLocale } from "@lib/util/money"
import {
  CATEGORY_ATTRIBUTE,
  LABELS_ATTRIBUTE,
  OPTION_VALUES_ATTRIBUTE,
} from "./attributes"

type Refinement = ReturnType<
  typeof useCurrentRefinements
>["items"][number]["refinements"][number]

function refinementLabel(refinement: Refinement, currencyCode: string) {
  const { attribute, label, value, operator } = refinement

  if (attribute === OPTION_VALUES_ATTRIBUTE) {
    const separator = String(value).indexOf(":")

    return separator < 1
      ? label
      : `${String(value).slice(0, separator)}: ${String(value).slice(
          separator + 1
        )}`
  }

  if (attribute === priceAttribute("on_sale", currencyCode)) {
    return "On sale"
  }

  if (attribute === priceAttribute("min_price", currencyCode)) {
    const amount = convertToLocale({
      amount: Number(value),
      currency_code: indexedCurrency(currencyCode),
      maximumFractionDigits: 0,
    })

    return operator === "<=" || operator === "<"
      ? `Up to ${amount}`
      : `From ${amount}`
  }

  if (attribute === CATEGORY_ATTRIBUTE) {
    return `Category: ${label}`
  }

  if (attribute === LABELS_ATTRIBUTE) {
    return `Label: ${label}`
  }

  return label
}

const CurrentRefinements = ({ currencyCode }: { currencyCode: string }) => {
  const { items, refine } = useCurrentRefinements()
  const { canRefine: canClearAll, refine: clearAll } = useClearRefinements()

  const refinements = items.flatMap((item) => item.refinements)

  if (!refinements.length) {
    return null
  }

  return (
    <div
      className="flex flex-col gap-y-2.5 border-t-2 border-dashed border-creata-ink pt-4"
      data-testid="current-refinements"
    >
      <div className="flex items-center justify-between gap-x-2">
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-creata-ink">
          Applied
        </span>
        {canClearAll && (
          <button
            type="button"
            onClick={clearAll}
            className="font-mono text-[11px] font-bold uppercase text-creata-coral underline"
            data-testid="clear-refinements"
          >
            Clear all
          </button>
        )}
      </div>

      <ul className="flex flex-wrap gap-1.5">
        {refinements.map((refinement) => {
          const label = refinementLabel(refinement, currencyCode)

          return (
            <li
              key={`${refinement.attribute}:${refinement.operator ?? ""}:${
                refinement.value
              }`}
            >
              <button
                type="button"
                onClick={() => refine(refinement)}
                aria-label={`Remove filter ${label}`}
                className="border-[1.5px] border-creata-ink bg-creata-yellow text-creata-ink font-mono text-[11px] font-bold h-8 px-2.5 flex items-center gap-x-1.5 shadow-zine-sm hover:bg-creata-coral transition-colors"
                data-testid="remove-refinement"
              >
                <span>{label}</span>
                <XMarkMini />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CurrentRefinements
