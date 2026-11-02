import { HttpTypes } from "@medusajs/types"
import Item from "@modules/cart/components/item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items ?? []
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)
  const sortedItems = [...items].sort((a, b) =>
    (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
  )

  return (
    <section className="cart-items" aria-label="Items in your cart">
      <div className="cart-items__heading">
        <div>
          <p className="eyebrow">YOUR CREATA SELECTION</p>
          <h2>In your cart</h2>
        </div>
        <span className="cart-items__count">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </div>
      <ul className="cart-items__list" data-testid="items-table">
        {sortedItems.map((item) => (
          <li key={item.id}>
            <Item item={item} currencyCode={cart?.currency_code ?? "inr"} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ItemsTemplate
