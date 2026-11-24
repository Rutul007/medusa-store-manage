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
    <div className="border-2 border-creata-ink bg-white shadow-zine px-5">
      <Accordion type="multiple">
        <Accordion.Item title="Object details" value="object-details">
          {details.length ? (
            <dl className="py-2 divide-y divide-dashed divide-creata-ink">
              {details.map(([label, value]) => (
                <div
                  className="grid grid-cols-[0.8fr_1.2fr] gap-4 py-2.5 text-sm"
                  key={label}
                >
                  <dt className="font-mono text-xs font-bold uppercase text-creata-muted">
                    {label}
                  </dt>
                  <dd className="text-creata-ink font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="py-2 text-sm text-creata-muted">
              Details for this object are coming soon.
            </p>
          )}
        </Accordion.Item>
        <Accordion.Item title="Shipping & returns" value="shipping-returns">
          <div className="py-2 flex flex-col items-start gap-2.5 text-sm text-creata-muted">
            <p>
              Find delivery options and return information in our customer care pages.
            </p>
            <LocalizedClientLink
              href="/shipping"
              className="font-mono text-xs font-bold uppercase text-creata-ink hover:bg-creata-yellow px-2 py-0.5 border border-creata-ink inline-flex items-center gap-1.5"
            >
              <span>Shipping information</span>
              <span aria-hidden="true">↗</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/returns"
              className="font-mono text-xs font-bold uppercase text-creata-ink hover:bg-creata-yellow px-2 py-0.5 border border-creata-ink inline-flex items-center gap-1.5"
            >
              <span>Returns &amp; exchanges</span>
              <span aria-hidden="true">↗</span>
            </LocalizedClientLink>
          </div>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default ProductTabs
