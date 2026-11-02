import { HttpTypes } from "@medusajs/types"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => (
  <div className="product-info" id="product-info">
    <h1 className="product-info__title" data-testid="product-title">
      {product.title}
    </h1>
    {product.subtitle && <p className="product-info__subtitle">{product.subtitle}</p>}
    {product.description && (
      <p className="product-info__description" data-testid="product-description">
        {product.description}
      </p>
    )}
  </div>
)

export default ProductInfo
