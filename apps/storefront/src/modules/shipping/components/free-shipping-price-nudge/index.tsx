"use client"

import { convertToLocale } from "@lib/util/money"
import { CheckCircleSolid, XMark } from "@medusajs/icons"
import {
  HttpTypes,
  StoreCart,
  StoreCartShippingOption,
  StorePrice,
} from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"
import { useState } from "react"
import { StoreFreeShippingPrice } from "types/global"

const computeTarget = (
  cart: HttpTypes.StoreCart,
  price: HttpTypes.StorePrice
) => {
  const priceRule = (price.price_rules || []).find(
    (pr) => pr.attribute === "item_total"
  )!

  const currentAmount = cart.item_total
  const targetAmount = parseFloat(priceRule.value)

  if (priceRule.operator === "gt") {
    return {
      current_amount: currentAmount,
      target_amount: targetAmount,
      target_reached: currentAmount > targetAmount,
      target_remaining:
        currentAmount > targetAmount ? 0 : targetAmount + 1 - currentAmount,
      remaining_percentage: (currentAmount / targetAmount) * 100,
    }
  } else if (priceRule.operator === "gte") {
    return {
      current_amount: currentAmount,
      target_amount: targetAmount,
      target_reached: currentAmount > targetAmount,
      target_remaining:
        currentAmount > targetAmount ? 0 : targetAmount - currentAmount,
      remaining_percentage: (currentAmount / targetAmount) * 100,
    }
  } else if (priceRule.operator === "lt") {
    return {
      current_amount: currentAmount,
      target_amount: targetAmount,
      target_reached: targetAmount > currentAmount,
      target_remaining:
        targetAmount > currentAmount ? 0 : currentAmount + 1 - targetAmount,
      remaining_percentage: (currentAmount / targetAmount) * 100,
    }
  } else if (priceRule.operator === "lte") {
    return {
      current_amount: currentAmount,
      target_amount: targetAmount,
      target_reached: targetAmount > currentAmount,
      target_remaining:
        targetAmount > currentAmount ? 0 : currentAmount - targetAmount,
      remaining_percentage: (currentAmount / targetAmount) * 100,
    }
  } else {
    return {
      current_amount: currentAmount,
      target_amount: targetAmount,
      target_reached: currentAmount === targetAmount,
      target_remaining:
        targetAmount > currentAmount ? 0 : targetAmount - currentAmount,
      remaining_percentage: (currentAmount / targetAmount) * 100,
    }
  }
}

export default function ShippingPriceNudge({
  variant = "inline",
  cart,
  shippingOptions,
}: {
  variant?: "popup" | "inline"
  cart: StoreCart
  shippingOptions: StoreCartShippingOption[]
}) {
  if (!cart || !shippingOptions?.length) {
    return null
  }

  const freeShippingPrice = shippingOptions
    .map((shippingOption) => {
      const calculatedPrice = shippingOption.calculated_price

      if (!calculatedPrice) {
        return
      }

      const validCurrencyPrices = shippingOption.prices.filter(
        (price) =>
          price.currency_code === cart.currency_code &&
          (price.price_rules || []).some(
            (priceRule) => priceRule.attribute === "item_total"
          )
      )

      return validCurrencyPrices.map((price) => {
        return {
          ...price,
          shipping_option_id: shippingOption.id,
          ...computeTarget(cart, price),
        }
      })
    })
    .flat(1)
    .filter(Boolean)
    .find((price) => price?.amount === 0)

  if (!freeShippingPrice) {
    return null
  }

  if (variant === "popup") {
    return <FreeShippingPopup cart={cart} price={freeShippingPrice} />
  } else {
    return <FreeShippingInline cart={cart} price={freeShippingPrice} />
  }
}

function FreeShippingInline({
  cart,
  price,
}: {
  cart: StoreCart
  price: StorePrice & {
    target_reached: boolean
    target_remaining: number
    remaining_percentage: number
  }
}) {
  return (
    <div className="bg-creata-yellow p-3.5 border-2 border-creata-ink shadow-zine-sm">
      <div className="space-y-2">
        <div className="flex justify-between font-mono text-xs font-bold text-creata-ink">
          <div>
            {price.target_reached ? (
              <div className="flex items-center gap-1.5">
                <CheckCircleSolid className="inline-block" />
                FREE SHIPPING UNLOCKED
              </div>
            ) : (
              "UNLOCK FREE SHIPPING"
            )}
          </div>

          <div
            className={clx("visible", {
              "opacity-0 invisible": price.target_reached,
            })}
          >
            {convertToLocale({
              amount: price.target_remaining,
              currency_code: cart.currency_code,
            })}{" "}
            AWAY
          </div>
        </div>
        <div className="flex justify-between gap-1 border border-creata-ink bg-white p-0.5">
          <div
            className={clx("bg-creata-coral h-2 max-w-full duration-500", {
              "bg-creata-mint": price.target_reached,
            })}
            style={{ width: `${Math.min(100, price.remaining_percentage)}%` }}
          />
          <div className="bg-transparent h-2 w-fit flex-grow" />
        </div>
      </div>
    </div>
  )
}

function FreeShippingPopup({
  cart,
  price,
}: {
  cart: StoreCart
  price: StoreFreeShippingPrice
}) {
  const [isClosed, setIsClosed] = useState(false)

  return (
    <div
      className={clx(
        "fixed bottom-5 right-5 hidden small:flex flex-col items-end gap-2 transition-all duration-300 z-30",
        {
          "opacity-0 invisible delay-1000": price.target_reached,
          "opacity-0 invisible": isClosed,
          "opacity-100 visible": !price.target_reached && !isClosed,
        }
      )}
    >
      <button
        type="button"
        aria-label="Dismiss shipping banner"
        className="w-8 h-8 bg-white text-creata-ink border-2 border-creata-ink shadow-zine-sm grid place-items-center hover:bg-creata-yellow"
        onClick={() => setIsClosed(true)}
      >
        <XMark />
      </button>

      <div className="w-[380px] bg-creata-ink text-creata-yellow p-5 border-2 border-creata-ink shadow-zine-coral">
        <div className="pb-4 space-y-3">
          <div className="flex justify-between font-mono text-xs font-bold">
            <div>
              {price.target_reached ? (
                <div className="flex items-center gap-1.5 text-creata-mint">
                  <CheckCircleSolid className="inline-block" />
                  FREE SHIPPING UNLOCKED
                </div>
              ) : (
                "UNLOCK FREE SHIPPING"
              )}
            </div>

            <div
              className={clx("visible text-white", {
                "opacity-0 invisible": price.target_reached,
              })}
            >
              {convertToLocale({
                amount: price.target_remaining,
                currency_code: cart.currency_code,
              })}{" "}
              AWAY
            </div>
          </div>

          <div className="flex justify-between gap-1 bg-white/15 p-0.5">
            <div
              className="bg-creata-mint h-2 max-w-full duration-500"
              style={{ width: `${Math.min(100, price.remaining_percentage)}%` }}
            />
            <div className="h-2 w-fit flex-grow" />
          </div>
        </div>

        <div className="flex gap-2.5">
          <LocalizedClientLink
            className="border-2 border-creata-yellow text-creata-yellow font-mono text-xs font-bold uppercase py-2.5 px-4 hover:bg-creata-yellow hover:text-creata-ink transition-colors"
            href="/cart"
          >
            View bag
          </LocalizedClientLink>

          <LocalizedClientLink
            className="flex-grow border-2 border-creata-mint bg-creata-mint text-creata-ink font-mono text-xs font-bold uppercase py-2.5 px-4 text-center hover:bg-creata-yellow transition-colors"
            href="/store"
          >
            Shop objects ↗
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
