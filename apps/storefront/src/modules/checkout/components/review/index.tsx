"use client"

import { Heading, Text, clx } from "@modules/common/components/ui"

import { HttpTypes } from "@medusajs/types"
import { useSearchParams } from "next/navigation"
import PaymentButton from "../payment-button"

const Review = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards &&
    ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])
      ?.length > 0 &&
    cart?.total === 0
  )

  const previousStepsCompleted =
    cart.shipping_address &&
    (cart.shipping_methods?.length ?? 0) > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="border-2 border-creata-ink bg-white shadow-zine-md p-6 sm:p-8">
      <div className="flex flex-row items-center justify-between mb-4">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-2xl sm:text-3xl uppercase items-center",
            {
              "opacity-45 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          REVIEW
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start w-full mb-6">
            <Text className="text-sm text-creata-muted leading-relaxed">
              By clicking Place Order, you confirm that you have read,
              understand, and accept our Terms of Use, Terms of Sale, and
              Returns Policy, and acknowledge CREATA 3D&apos;s Privacy Policy.
            </Text>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  )
}

export default Review
