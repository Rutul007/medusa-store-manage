import { HttpTypes } from "@medusajs/types"
import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { Heading } from "@modules/common/components/ui"

const CheckoutSummary = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  return (
    <div className="small:sticky small:top-24 flex flex-col">
      <div className="w-full border-2 border-creata-ink bg-white shadow-zine-md p-6 flex flex-col">
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-creata-coral">
          RECEIPT // SUMMARY
        </span>
        <Heading level="h2" className="mt-1 text-2xl uppercase">
          IN YOUR PRINT BAG
        </Heading>
        <Divider className="my-5" />
        <CartTotals totals={cart} />
        <ItemsPreviewTemplate cart={cart} />
        <div className="pt-2">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
