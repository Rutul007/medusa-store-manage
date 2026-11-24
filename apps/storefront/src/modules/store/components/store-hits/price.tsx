"use client"

import { indexedCurrency, priceAttribute } from "@lib/search-client"
import { convertToLocale } from "@lib/util/money"
import { Text, clx } from "@modules/common/components/ui"

/** The per-currency price fields a hit may carry, e.g. `min_price_eur`. */
export type HitPricing = Record<string, unknown>

type HitPriceProps = {
  hit: HitPricing
  currencyCode: string
}

const amount = (value: unknown) => (typeof value === "number" ? value : null)

const HitPrice = ({ hit, currencyCode }: HitPriceProps) => {
  const currency_code = indexedCurrency(currencyCode)
  const min_price = amount(hit[priceAttribute("min_price", currencyCode)])
  const max_price = amount(hit[priceAttribute("max_price", currencyCode)])
  const original_price = amount(
    hit[priceAttribute("original_price", currencyCode)]
  )
  const on_sale = hit[priceAttribute("on_sale", currencyCode)] === true

  if (min_price === null) {
    return null
  }

  const format = (value: number) =>
    convertToLocale({ amount: value, currency_code })

  const max = max_price ?? min_price
  const isRange = max > min_price

  return (
    <div
      className="inline-flex items-baseline gap-x-1.5 px-2 py-0.5 bg-creata-yellow border-[1.5px] border-creata-ink font-mono text-xs font-bold text-creata-ink"
      data-testid="product-price"
    >
      {!isRange && on_sale && original_price !== null && (
        <Text
          as="span"
          className="line-through text-[11px] font-normal text-creata-muted"
          data-testid="original-price"
        >
          {format(original_price)}
        </Text>
      )}
      <Text
        as="span"
        className={clx("font-mono text-xs font-bold text-creata-ink", {
          "text-creata-coral": on_sale,
        })}
        data-testid="price"
      >
        {isRange ? `${format(min_price)} - ${format(max)}` : format(min_price)}
      </Text>
    </div>
  )
}

export default HitPrice
