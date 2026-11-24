import { HttpTypes } from "@medusajs/types"
import { cookies as nextCookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import { Heading } from "@modules/common/components/ui"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import PaymentDetails from "@modules/order/components/payment-details"
import ShippingDetails from "@modules/order/components/shipping-details"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-10 sm:py-16 min-h-[calc(100vh-76px)]">
      <div className="content-container flex flex-col justify-center items-center gap-y-8 max-w-4xl w-full">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex flex-col gap-6 w-full border-2 border-creata-ink bg-white shadow-zine-lg p-6 sm:p-10"
          data-testid="order-complete-container"
        >
          <div>
            <span className="inline-flex px-3 py-1 border-[1.5px] border-creata-ink bg-creata-mint text-creata-ink font-mono text-[11px] font-bold uppercase tracking-wider -rotate-1 shadow-zine-sm mb-4">
              ORDER CONFIRMED!
            </span>
            <Heading
              level="h1"
              className="flex flex-col gap-y-1 font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-creata-ink"
            >
              <span>THANK YOU!</span>
              <span>YOUR ORDER IS IN THE PRINT QUEUE.</span>
            </Heading>
          </div>
          <OrderDetails order={order} />
          <Heading level="h2" className="text-2xl uppercase pt-2">
            SUMMARY
          </Heading>
          <Items order={order} />
          <CartTotals totals={order} />
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
          <Help />
        </div>
      </div>
    </div>
  )
}
