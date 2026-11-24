import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import ItemsTemplate from "./items"
import Summary from "./summary"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const hasItems = Boolean(cart?.items?.length)

  return (
    <div className="min-h-[70vh] text-creata-ink">
      <div className="content-container pb-24" data-testid="cart-container">
        <div className="py-5 flex items-center justify-between gap-4 border-b-2 border-creata-ink">
          <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-creata-ink">
            CREATA 3D // PRINT BAG
          </p>
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border-[1.5px] border-creata-ink bg-white hover:bg-creata-yellow font-mono text-[11px] font-bold uppercase tracking-wider text-creata-ink shadow-zine-sm transition-colors"
          >
            <span>CONTINUE SHOPPING</span>
            <span aria-hidden="true">↗</span>
          </LocalizedClientLink>
        </div>

        <header className="py-8 sm:py-10">
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight leading-[0.95] text-creata-ink">
            {hasItems ? "YOUR PRINT BAG" : "YOUR BAG, FOR NOW."}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-creata-muted max-w-[520px]">
            {hasItems
              ? "A few freshly sliced objects, queued up and ready when you are."
              : "Thoughtful 3D printed objects are waiting to find their spot on your desk."}
          </p>
        </header>

        {hasItems && cart ? (
          <div className="grid grid-cols-1 small:grid-cols-[1fr_380px] gap-8 medium:gap-12 items-start">
            <div className="min-w-0 flex flex-col gap-5">
              {!customer && <SignInPrompt />}
              <ItemsTemplate cart={cart} />
            </div>
            <aside className="small:sticky small:top-24" aria-label="Order summary">
              {cart.region && <Summary cart={cart} />}
            </aside>
          </div>
        ) : (
          <EmptyCartMessage />
        )}
      </div>
    </div>
  )
}

export default CartTemplate
