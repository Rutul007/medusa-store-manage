import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductActions from "@modules/products/components/product-actions"
import VariantImageGallery from "@modules/products/components/image-gallery/variant-image-gallery"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { Suspense } from "react"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate = ({
  product,
  region,
  countryCode,
}: ProductTemplateProps) => {
  if (!product?.id) {
    return notFound()
  }

  return (
    <div className="product-page" data-testid="product-container">
      <div className="product-page__container">
        <nav className="product-breadcrumbs" aria-label="Breadcrumb">
          <LocalizedClientLink href="/store">All objects</LocalizedClientLink>
          <span aria-hidden="true">/</span>
          {product.collection ? (
            <LocalizedClientLink href={`/collections/${product.collection.handle}`}>
              {product.collection.title}
            </LocalizedClientLink>
          ) : (
            <span>CREATA objects</span>
          )}
          <span aria-hidden="true">/</span>
          <span className="product-breadcrumbs__current">{product.title}</span>
        </nav>

        <section className="product-layout" aria-label={product.title}>
          <div className="product-layout__gallery">
            <VariantImageGallery product={product} />
            <div className="product-gallery-note">
              <span>FORM, FUNCTION, A LITTLE CHARACTER.</span>
              <span>CREATA 3D / OBJECTS FOR EVERYDAY</span>
            </div>
          </div>

          <div className="product-layout__details">
            <div className="product-detail-heading">
              <p className="eyebrow">{product.collection?.title || "THE CREATA OBJECTS"}</p>
              <ProductInfo product={product} />
            </div>

            <div className="product-detail-promise">
              <span className="product-detail-promise__mark" aria-hidden="true">+</span>
              <span>Designed with curiosity. Made to live with.</span>
            </div>

            <div className="product-actions">
              <ProductActions product={product} region={region} />
            </div>

            <div className="product-service-links">
              <LocalizedClientLink href="/shipping">Shipping information <span aria-hidden="true">↗</span></LocalizedClientLink>
              <LocalizedClientLink href="/returns">Returns & exchanges <span aria-hidden="true">↗</span></LocalizedClientLink>
            </div>

            <ProductTabs product={product} />
          </div>
        </section>

        <section className="product-story" aria-label="About CREATA 3D">
          <div className="product-story__eyebrow">A NOTE FROM THE STUDIO <span>01 — 03</span></div>
          <div className="product-story__content">
            <h2>Objects with a little more <em>intention.</em></h2>
            <p>
              CREATA 3D brings digital ideas into the everyday. We make considered pieces
              with shape, texture, and a point of view—designed to find their place in your space.
            </p>
          </div>
        </section>

        <section className="product-related" data-testid="related-products-container">
          <div className="product-related__heading">
            <div>
              <p className="eyebrow">KEEP EXPLORING</p>
              <h2>More objects to live with.</h2>
            </div>
            <LocalizedClientLink href="/store" className="text-link">
              Shop all objects <span aria-hidden="true">↗</span>
            </LocalizedClientLink>
          </div>
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </section>
      </div>
    </div>
  )
}

export default ProductTemplate
