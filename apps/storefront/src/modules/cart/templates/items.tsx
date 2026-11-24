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
    <section aria-label="Items in your cart">
      <div className="flex items-end justify-between gap-4 pb-4 border-b-2 border-creata-ink mb-5">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-creata-coral">
            YOUR SELECTION
          </p>
          <h2 className="mt-1 font-display font-extrabold text-2xl uppercase tracking-tight text-creata-ink">
            IN YOUR BAG
          </h2>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 border-[1.5px] border-creata-ink bg-creata-yellow font-mono text-[11px] font-bold uppercase text-creata-ink">
          {itemCount} {itemCount === 1 ? "ITEM" : "ITEMS"}
        </span>
      </div>
      <ul className="flex flex-col gap-4" data-testid="items-table">
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
