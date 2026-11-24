import { HttpTypes } from "@medusajs/types"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => (
  <div className="mt-4" id="product-info">
    <h1
      className="font-display font-extrabold uppercase text-3xl sm:text-5xl tracking-tight leading-[0.98] text-creata-ink"
      data-testid="product-title"
    >
      {product.title}
    </h1>
    {product.subtitle && (
      <p className="mt-2.5 font-mono text-sm font-bold text-creata-muted">
        {product.subtitle}
      </p>
    )}
    {product.description && (
      <p
        className="mt-4 max-w-[520px] text-sm sm:text-[15px] leading-relaxed text-creata-muted font-medium"
        data-testid="product-description"
      >
        {product.description}
      </p>
    )}
  </div>
)

export default ProductInfo
