import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({ product })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="product-card group"
      aria-label={`View ${product.title}`}
    >
      <div className="product-card__visual" data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          alt={product.title}
          size="square"
          isFeatured={isFeatured}
          className="product-card__thumbnail"
        />
        <span className="product-card__arrow" aria-hidden="true">↗</span>
      </div>
      <div className="product-card__details">
        <div className="product-card__copy">
          <span className="product-card__eyebrow">CREATA OBJECT</span>
          <span className="product-card__title" data-testid="product-title">{product.title}</span>
        </div>
        <div className="product-card__price">
          {cheapestPrice ? <PreviewPrice price={cheapestPrice} /> : <span>View object</span>}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
