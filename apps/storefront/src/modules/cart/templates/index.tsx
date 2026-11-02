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
    <div className="cart-page">
      <div className="cart-page__container" data-testid="cart-container">
        <div className="cart-page__topline">
          <p className="eyebrow">CREATA 3D / YOUR BAG</p>
          <LocalizedClientLink href="/store">Continue shopping <span aria-hidden="true">↗</span></LocalizedClientLink>
        </div>

        <header className="cart-page__heading">
          <h1>{hasItems ? "Your cart" : "Your cart, for now."}</h1>
          <p>{hasItems ? "A few good things, ready when you are." : "Thoughtful objects are waiting to find their place."}</p>
        </header>

        {hasItems && cart ? (
          <div className="cart-layout">
            <div className="cart-layout__items">
              {!customer && <SignInPrompt />}
              <ItemsTemplate cart={cart} />
            </div>
            <aside className="cart-layout__summary" aria-label="Order summary">
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
