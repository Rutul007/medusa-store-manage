"use client"

import { HttpTypes } from "@medusajs/types"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@modules/common/components/ui"

type SummaryProps = {
  cart: HttpTypes.StoreCart
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="border-2 border-creata-ink bg-white shadow-zine-md p-6">
      <div className="pb-4 border-b-2 border-dashed border-creata-ink">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-creata-coral">
          RECEIPT // SUMMARY
        </p>
        <h2 className="mt-1 font-display font-extrabold text-2xl uppercase tracking-tight text-creata-ink">
          ORDER SUMMARY
        </h2>
      </div>
      <div className="pt-4">
        <DiscountCode cart={cart} />
      </div>
      <CartTotals totals={cart} />
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        className="block mt-5"
        data-testid="checkout-button"
      >
        <Button className="w-full justify-between px-5" size="large">
          <span>CONTINUE TO CHECKOUT</span>
          <span aria-hidden="true">↗</span>
        </Button>
      </LocalizedClientLink>
      <p className="mt-3 text-center font-mono text-[11px] text-creata-muted">
        Shipping options and final taxes are confirmed during checkout.
      </p>
    </div>
  )
}

export default Summary
