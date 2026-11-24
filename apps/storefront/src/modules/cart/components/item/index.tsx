"use client"

import { deleteLineItem, updateLineItem } from "@lib/data/cart"
import { notifyCartUpdated } from "@lib/util/cart-events"
import {
  PERSONALIZATION_METADATA_KEY,
  PersonalizationValue,
} from "@lib/util/personalization"
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
  const rawPersonalization = item.metadata?.[PERSONALIZATION_METADATA_KEY]
  const personalization =
    rawPersonalization && typeof rawPersonalization === "object"
      ? (rawPersonalization as PersonalizationValue)
      : null
  const [editingPersonalization, setEditingPersonalization] = useState(false)
  const [personalizationDraft, setPersonalizationDraft] = useState(
    personalization?.answer ?? ""
  )

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

  const savePersonalization = async () => {
    if (!personalization || updating) return

    const answer = personalizationDraft.trim()
    if (personalization.required && !answer) {
      setError("Please enter the requested personalization.")
      return
    }
    if (answer.length > personalization.maxLength) {
      setError(
        `Keep your answer to ${personalization.maxLength} characters or fewer.`
      )
      return
    }

    setError(null)
    setUpdating(true)
    try {
      await updateLineItem({
        lineId: item.id,
        quantity: item.quantity,
        metadata: {
          ...(item.metadata ?? {}),
          [PERSONALIZATION_METADATA_KEY]: answer
            ? { ...personalization, answer }
            : "",
        },
      })
      setEditingPersonalization(false)
      notifyCartUpdated()
      router.refresh()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not update personalization"
      )
    } finally {
      setUpdating(false)
    }
  }

  return (
    <article
      className={`border-2 border-creata-ink bg-white grid transition-opacity ${
        isPreview
          ? "grid-cols-[64px_minmax(0,1fr)] gap-3 p-3 shadow-zine-sm"
          : "grid-cols-[88px_minmax(0,1fr)] sm:grid-cols-[120px_minmax(0,1fr)] gap-4 sm:gap-5 p-4 sm:p-5 shadow-zine"
      } ${updating ? "opacity-60" : ""}`}
      data-testid="product-row"
      aria-busy={updating}
    >
      <LocalizedClientLink
        href={`/products/${item.product_handle}`}
        className="group block w-full self-start border-[1.5px] border-creata-ink overflow-hidden bg-creata-yellow-soft"
        aria-label={`View ${item.product_title}`}
      >
        <Thumbnail
          thumbnail={item.thumbnail}
          images={item.variant?.product?.images}
          alt={item.product_title}
          size="square"
          className="h-full w-full"
        />
      </LocalizedClientLink>

      <div className="min-w-0 flex flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex flex-col items-start gap-1.5">
            <LocalizedClientLink
              href={`/products/${item.product_handle}`}
              className={`font-display font-extrabold text-creata-ink hover:text-creata-coral transition-colors leading-snug ${
                isPreview ? "text-sm" : "text-base sm:text-lg"
              }`}
              data-testid="product-title"
            >
              {item.product_title}
            </LocalizedClientLink>

            {item.variant && item.variant.title !== "Default variant" && (
              <div className="font-mono text-xs text-creata-muted">
                <LineItemOptions
                  variant={item.variant}
                  data-testid="product-variant"
                />
              </div>
            )}

            {personalization && !editingPersonalization && (
              <div className="mt-1 w-full bg-creata-yellow border-[1.5px] border-creata-ink px-3 py-2 flex flex-col items-start gap-1">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-creata-ink">
                  STAMP // {personalization.question}
                </span>
                <span className="font-mono text-xs font-bold text-creata-ink break-words">
                  &ldquo;{personalization.answer || "No text added"}&rdquo;
                </span>
                {!isPreview && (
                  <button
                    className="font-mono text-[11px] font-bold uppercase underline underline-offset-2 text-creata-ink hover:text-creata-coral mt-0.5"
                    type="button"
                    onClick={() => {
                      setPersonalizationDraft(personalization.answer)
                      setEditingPersonalization(true)
                    }}
                    disabled={updating}
                  >
                    EDIT TEXT
                  </button>
                )}
              </div>
            )}

            {personalization && editingPersonalization && !isPreview && (
              <div className="mt-1 w-full bg-creata-yellow-soft border-[1.5px] border-creata-ink p-3 flex flex-col gap-2">
                <label
                  className="font-mono text-[10px] font-bold uppercase tracking-wider text-creata-ink"
                  htmlFor={`personalization-${item.id}`}
                >
                  STAMP // {personalization.question}
                </label>
                <input
                  id={`personalization-${item.id}`}
                  className="w-full h-10 px-3 border-2 border-creata-ink bg-white font-mono text-sm text-creata-ink outline-none focus:bg-creata-yellow-soft"
                  type="text"
                  value={personalizationDraft}
                  maxLength={personalization.maxLength}
                  onChange={(event) =>
                    setPersonalizationDraft(event.target.value)
                  }
                  disabled={updating}
                />
                <div className="flex gap-3 font-mono text-[11px] font-bold uppercase">
                  <button
                    type="button"
                    onClick={savePersonalization}
                    disabled={updating}
                    className="px-2.5 py-1 border-[1.5px] border-creata-ink bg-creata-mint text-creata-ink hover:bg-creata-yellow"
                  >
                    {updating ? "SAVING..." : "SAVE TEXT"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPersonalizationDraft(personalization.answer)
                      setEditingPersonalization(false)
                      setError(null)
                    }}
                    disabled={updating}
                    className="px-2.5 py-1 border-[1.5px] border-creata-ink bg-white text-creata-ink hover:bg-creata-cream"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            )}

            {isPreview && (
              <span className="font-mono text-xs text-creata-muted">
                QTY: {item.quantity}
              </span>
            )}
          </div>

          {!isPreview && (
            <button
              className="shrink-0 font-mono text-[11px] font-bold uppercase text-creata-ink hover:text-creata-coral underline underline-offset-2"
              type="button"
              onClick={removeItem}
              disabled={updating}
              data-testid="product-delete-button"
            >
              {updating ? "UPDATING" : "REMOVE"}
            </button>
          )}
        </div>

        <div className="flex items-end justify-between gap-3 pt-1">
          {!isPreview ? (
            <div
              className="inline-flex items-center border-[1.5px] border-creata-ink bg-creata-cream"
              aria-label={`Quantity for ${item.product_title}`}
            >
              <button
                type="button"
                aria-label={`Decrease ${item.product_title} quantity`}
                onClick={() => changeQuantity(item.quantity - 1)}
                disabled={updating || item.quantity <= 1}
                className="w-8 h-8 border-r-[1.5px] border-creata-ink bg-white hover:bg-creata-yellow font-mono text-sm font-bold text-creata-ink disabled:opacity-35"
                data-testid="decrease-quantity"
              >
                -
              </button>
              <span
                className="min-w-[32px] text-center font-mono text-xs font-bold text-creata-ink"
                aria-live="polite"
                data-testid="product-quantity"
              >
                {item.quantity}
              </span>
              <button
                type="button"
                aria-label={`Increase ${item.product_title} quantity`}
                onClick={() => changeQuantity(item.quantity + 1)}
                disabled={updating}
                className="w-8 h-8 border-l-[1.5px] border-creata-ink bg-white hover:bg-creata-yellow font-mono text-sm font-bold text-creata-ink disabled:opacity-35"
                data-testid="increase-quantity"
              >
                +
              </button>
            </div>
          ) : (
            <span className="font-mono text-xs text-creata-muted">
              {item.quantity} ×
            </span>
          )}

          <div className="flex flex-col items-end font-mono">
            {!isPreview && (
              <span className="text-xs text-creata-muted">
                <LineItemUnitPrice
                  item={item}
                  style="tight"
                  currencyCode={currencyCode}
                />
              </span>
            )}
            <span className="text-sm font-bold text-creata-ink">
              <LineItemPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          </div>
        </div>

        {error && (
          <p className="font-mono text-xs font-bold text-creata-coral" role="alert">
            {error}
          </p>
        )}
      </div>
    </article>
  )
}

export default Item
