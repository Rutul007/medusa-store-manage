"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  return (
    <div className="cart-totals">
      <div className="flex flex-col gap-y-2.5 text-sm text-creata-muted">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase">Subtotal</span>
          <span
            className="font-mono font-bold text-creata-ink"
            data-testid="cart-subtotal"
            data-value={item_subtotal || 0}
          >
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase">Shipping</span>
          <span
            className="font-mono font-bold text-creata-ink"
            data-testid="cart-shipping"
            data-value={shipping_subtotal || 0}
          >
            {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
          </span>
        </div>
        {!!discount_subtotal && (
          <div className="flex items-center justify-between gap-4 text-creata-ink font-bold">
            <span className="font-mono text-xs uppercase px-1.5 py-0.5 bg-creata-mint border border-creata-ink">
              Discount
            </span>
            <span
              className="font-mono"
              data-testid="cart-discount"
              data-value={discount_subtotal || 0}
            >
              -{" "}
              {convertToLocale({
                amount: discount_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase">Taxes</span>
          <span
            className="font-mono font-bold text-creata-ink"
            data-testid="cart-taxes"
            data-value={tax_total || 0}
          >
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
      </div>
      <div className="w-full border-b-2 border-dashed border-creata-ink my-4" />
      <div className="flex items-center justify-between gap-4 text-creata-ink">
        <span className="font-mono font-bold text-sm uppercase">Total</span>
        <span
          className="px-2.5 py-1 bg-creata-yellow border-2 border-creata-ink font-mono text-lg font-bold tracking-tight shadow-zine-sm"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
      <div className="w-full border-b-2 border-dashed border-creata-ink mt-4" />
    </div>
  )
}

export default CartTotals
