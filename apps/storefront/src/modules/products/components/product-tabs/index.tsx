import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Accordion from "./accordion"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const dimensions =
    product.length && product.width && product.height
      ? `${product.length} × ${product.width} × ${product.height} mm`
      : null

  const details = [
    ["Material", product.material],
    ["Dimensions", dimensions],
    ["Weight", product.weight ? `${product.weight} g` : null],
    ["Origin", product.origin_country],
    ["Type", product.type?.value],
  ].filter((detail): detail is [string, string] => Boolean(detail[1]))

  return (
    <div className="product-tabs">
      <Accordion type="multiple">
        <Accordion.Item className="product-tabs__item" title="Object details" value="object-details">
          {details.length ? (
            <dl className="product-specs">
              {details.map(([label, value]) => (
                <div className="product-specs__row" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="product-tabs__empty">Details for this object are coming soon.</p>
          )}
        </Accordion.Item>
        <Accordion.Item className="product-tabs__item" title="Shipping & returns" value="shipping-returns">
          <div className="product-tabs__links">
            <p>Find delivery options and return information in our customer care pages.</p>
            <LocalizedClientLink href="/shipping">Shipping information <span aria-hidden="true">↗</span></LocalizedClientLink>
            <LocalizedClientLink href="/returns">Returns & exchanges <span aria-hidden="true">↗</span></LocalizedClientLink>
          </div>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default ProductTabs
