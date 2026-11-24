"use client"

import * as Slider from "@radix-ui/react-slider"
import { useState } from "react"
import { useRange } from "react-instantsearch"

import { indexedCurrency, priceAttribute } from "@lib/search-client"

function formatAmount(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency.toUpperCase(),
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${Math.round(amount)} ${currency.toUpperCase()}`
  }
}

const PriceRange = ({ currencyCode }: { currencyCode: string }) => {
  const { start, range, canRefine, refine } = useRange({
    attribute: priceAttribute("min_price", currencyCode),
  })
  const currency = indexedCurrency(currencyCode)
  const format = (amount: number) => formatAmount(amount, currency)

  const min = Math.floor(range.min ?? 0)
  const max = Math.ceil(range.max ?? 0)

  const from = Number.isFinite(start[0]) ? (start[0] as number) : min
  const to = Number.isFinite(start[1]) ? (start[1] as number) : max

  const [draftRange, setDraftRange] = useState<number[] | null>(null)
  const value = draftRange ?? [from, to]

  if (!canRefine || min >= max) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-3 border-t-2 border-dashed border-creata-ink pt-4">
      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-creata-ink">
        Price
      </span>

      <div className="flex flex-col gap-y-3">
        <Slider.Root
          className="relative flex h-5 w-full touch-none select-none items-center"
          value={value}
          min={min}
          max={max}
          step={1}
          minStepsBetweenThumbs={0}
          onValueChange={setDraftRange}
          onValueCommit={(committed) => {
            refine([committed[0], committed[1]])
            setDraftRange(null)
          }}
          aria-label="Price range"
          data-testid="price-range"
        >
          <Slider.Track className="relative h-2 w-full grow border-[1.5px] border-creata-ink bg-creata-cream">
            <Slider.Range className="absolute h-full bg-creata-coral" />
          </Slider.Track>
          {value.map((_, index) => (
            <Slider.Thumb
              key={index}
              className="block h-4 w-4 border-2 border-creata-ink bg-creata-yellow shadow-zine-sm outline-none focus-visible:ring-2 focus-visible:ring-creata-ink"
              aria-label={index === 0 ? "Minimum price" : "Maximum price"}
            />
          ))}
        </Slider.Root>

        <div className="flex items-center justify-between font-mono text-xs font-bold text-creata-ink">
          <span>{format(value[0])}</span>
          <span>{format(value[1])}</span>
        </div>
      </div>
    </div>
  )
}

export default PriceRange
