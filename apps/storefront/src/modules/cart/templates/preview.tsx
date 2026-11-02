import { HttpTypes } from "@medusajs/types"
import Item from "@modules/cart/components/item"

type ItemsPreviewProps = {
  cart: HttpTypes.StoreCart
}

const ItemsPreviewTemplate = ({ cart }: ItemsPreviewProps) => {
  const items = [...(cart.items ?? [])]
    .sort((a, b) => (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1)
    .slice(0, 5)

  return (
    <ul className="cart-preview-items" data-testid="items-table">
      {items.map((item) => (
        <li key={item.id}>
          <Item item={item} type="preview" currencyCode={cart.currency_code} />
        </li>
      ))}
    </ul>
  )
}

export default ItemsPreviewTemplate
