import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <section className="cart-empty" data-testid="empty-cart-message">
      <span className="cart-empty__symbol" aria-hidden="true">＋</span>
      <p className="eyebrow">ROOM FOR SOMETHING GOOD</p>
      <h2>Your cart is taking a breather.</h2>
      <p className="cart-empty__copy">Explore thoughtful 3D printed objects and find something that feels like you.</p>
      <LocalizedClientLink className="cart-empty__button" href="/store">
        Explore the collection <span aria-hidden="true">↗</span>
      </LocalizedClientLink>
    </section>
  )
}

export default EmptyCartMessage
