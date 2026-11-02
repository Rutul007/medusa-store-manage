"use client"

import { deleteLineItem, updateLineItem } from "@lib/data/cart"
import { notifyCartUpdated } from "@lib/util/cart-events"
import { HttpTypes } from "@medusajs/types"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { useRouter } from "next/navigation"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const router = useRouter()
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isPreview = type === "preview"

  const changeQuantity = async (quantity: number) => {
    if (quantity < 1 || quantity === item.quantity || updating) {
      return
    }

    setError(null)
    setUpdating(true)

    try {
      await updateLineItem({ lineId: item.id, quantity })
      notifyCartUpdated()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update quantity")
    } finally {
      setUpdating(false)
    }
  }

  const removeItem = async () => {
    if (updating) return

    setError(null)
    setUpdating(true)

    try {
      await deleteLineItem(item.id)
      notifyCartUpdated()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove item")
      setUpdating(false)
    }
  }

  return (
    <article
      className={`cart-line-item${isPreview ? " cart-line-item--preview" : ""}`}
      data-testid="product-row"
      aria-busy={updating}
    >
      <LocalizedClientLink
        href={`/products/${item.product_handle}`}
        className="cart-line-item__image"
        aria-label={`View ${item.product_title}`}
      >
        <Thumbnail
          thumbnail={item.thumbnail}
          images={item.variant?.product?.images}
          alt={item.product_title}
          size="square"
          className="cart-line-item__thumbnail"
        />
      </LocalizedClientLink>

      <div className="cart-line-item__main">
        <div className="cart-line-item__top">
          <div className="cart-line-item__description">
            <LocalizedClientLink
              href={`/products/${item.product_handle}`}
              className="cart-line-item__title"
              data-testid="product-title"
            >
              {item.product_title}
            </LocalizedClientLink>
            {item.variant && item.variant.title !== "Default variant" && (
              <LineItemOptions
                variant={item.variant}
                data-testid="product-variant"
              />
            )}
            {isPreview && (
              <span className="cart-line-item__preview-quantity">
                Quantity: {item.quantity}
              </span>
            )}
          </div>

          {!isPreview && (
            <button
              className="cart-line-item__remove"
              type="button"
              onClick={removeItem}
              disabled={updating}
              data-testid="product-delete-button"
            >
              {updating ? "Updating" : "Remove"}
            </button>
          )}
        </div>

        <div className="cart-line-item__bottom">
          {!isPreview ? (
            <div className="cart-quantity" aria-label={`Quantity for ${item.product_title}`}>
              <button
                type="button"
                aria-label={`Decrease ${item.product_title} quantity`}
                onClick={() => changeQuantity(item.quantity - 1)}
                disabled={updating || item.quantity <= 1}
                data-testid="decrease-quantity"
              >
                −
              </button>
              <span aria-live="polite" data-testid="product-quantity">
                {item.quantity}
              </span>
              <button
                type="button"
                aria-label={`Increase ${item.product_title} quantity`}
                onClick={() => changeQuantity(item.quantity + 1)}
                disabled={updating}
                data-testid="increase-quantity"
              >
                +
              </button>
            </div>
          ) : (
            <span className="cart-line-item__preview-quantity">{item.quantity} ×</span>
          )}

          <div className="cart-line-item__prices">
            {!isPreview && (
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            )}
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        </div>

        {error && <p className="cart-line-item__error" role="alert">{error}</p>}
      </div>
    </article>
  )
}

export default Item
