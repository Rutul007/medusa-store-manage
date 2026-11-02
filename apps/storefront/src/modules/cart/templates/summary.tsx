"use client"

import { Button } from "@modules/common/components/ui"

import CartTotals from "@modules/common/components/cart-totals"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

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
    <div className="cart-summary">
      <div className="cart-summary__heading">
        <p className="eyebrow">A CLEAR VIEW BEFORE CHECKOUT</p>
        <h2>Order summary</h2>
      </div>
      <div className="cart-summary__discount">
        <DiscountCode cart={cart} />
      </div>
      <CartTotals totals={cart} />
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        className="cart-summary__checkout-link"
        data-testid="checkout-button"
      >
        <Button className="cart-summary__checkout" size="large">
          <span>Continue to checkout</span><span aria-hidden="true">↗</span>
        </Button>
      </LocalizedClientLink>
      <p className="cart-summary__note">Shipping options and final taxes are confirmed during checkout.</p>
    </div>
  )
}

export default Summary
