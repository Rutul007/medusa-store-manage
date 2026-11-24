"use client"

import { Dialog, Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
import { deleteLineItem, retrieveCart, updateLineItem } from "@lib/data/cart"
import {
  CART_UPDATED_EVENT,
  CartUpdatedDetail,
  notifyCartUpdated,
} from "@lib/util/cart-events"
import { convertToLocale } from "@lib/util/money"
import {
  PERSONALIZATION_METADATA_KEY,
  PersonalizationValue,
} from "@lib/util/personalization"
import { HttpTypes } from "@medusajs/types"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname, useRouter } from "next/navigation"
import { Fragment, useEffect, useState } from "react"

const countItems = (cart?: HttpTypes.StoreCart | null) =>
  cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

const CartDrawerItem = ({
  item,
  currencyCode,
  onNavigate,
  onMutated,
}: {
  item: HttpTypes.StoreCartLineItem
  currencyCode: string
  onNavigate: () => void
  onMutated: () => void
}) => {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const rawPersonalization = item.metadata?.[PERSONALIZATION_METADATA_KEY]
  const personalization =
    rawPersonalization && typeof rawPersonalization === "object"
      ? (rawPersonalization as PersonalizationValue)
      : null

  const updateQty = async (nextQty: number) => {
    if (nextQty < 1 || nextQty === item.quantity || busy) return
    setBusy(true)
    setError(null)
    try {
      await updateLineItem({ lineId: item.id, quantity: nextQty })
      onMutated()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update quantity")
    } finally {
      setBusy(false)
    }
  }

  const remove = async () => {
    if (busy) return
    setBusy(true)
    setError(null)
    try {
      await deleteLineItem(item.id)
      onMutated()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove item")
      setBusy(false)
    }
  }

  return (
    <div
      className={`bg-white border-2 border-creata-ink shadow-[3px_3px_0_#111111] p-3 grid grid-cols-[68px_1fr] gap-3 transition-opacity ${
        busy ? "opacity-60" : ""
      }`}
      data-testid="cart-item"
    >
      <LocalizedClientLink
        href={`/products/${item.product_handle}`}
        onClick={onNavigate}
        className="w-[68px] h-[68px] border-[1.5px] border-creata-ink overflow-hidden bg-creata-cream block"
      >
        <Thumbnail
          thumbnail={item.thumbnail}
          images={item.variant?.product?.images}
          size="square"
          className="!p-0 !rounded-none !border-0"
        />
      </LocalizedClientLink>

      <div className="min-w-0 flex flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-display font-extrabold text-sm text-creata-ink leading-snug truncate">
              <LocalizedClientLink
                href={`/products/${item.product_handle}`}
                onClick={onNavigate}
                className="hover:underline"
                data-testid="product-link"
              >
                {item.title}
              </LocalizedClientLink>
            </h4>
            {item.variant && item.variant.title !== "Default variant" && (
              <div className="text-xs text-creata-muted mt-0.5">
                <LineItemOptions
                  variant={item.variant}
                  data-testid="cart-item-variant"
                  data-value={item.variant}
                />
              </div>
            )}
          </div>

          <div className="shrink-0 font-mono text-xs font-bold text-creata-ink">
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        </div>

        {personalization?.answer && (
          <div className="px-2.5 py-1 bg-creata-yellow border-[1.5px] border-creata-ink font-mono text-[11px] font-bold text-creata-ink break-words">
            STAMP: &ldquo;{personalization.answer}&rdquo;
          </div>
        )}

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="inline-flex items-center border-[1.5px] border-creata-ink bg-creata-cream">
            <button
              type="button"
              onClick={() => updateQty(item.quantity - 1)}
              disabled={busy || item.quantity <= 1}
              className="w-7 h-7 font-mono text-sm font-bold text-creata-ink disabled:opacity-40"
              aria-label={`Decrease ${item.title} quantity`}
            >
              -
            </button>
            <span
              className="min-w-[26px] h-7 px-1 border-x-[1.5px] border-creata-ink grid place-items-center font-mono text-xs font-bold text-creata-ink"
              data-testid="cart-item-quantity"
              data-value={item.quantity}
            >
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQty(item.quantity + 1)}
              disabled={busy}
              className="w-7 h-7 font-mono text-sm font-bold text-creata-ink disabled:opacity-40"
              aria-label={`Increase ${item.title} quantity`}
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={remove}
            disabled={busy}
            className="font-mono text-[11px] font-bold uppercase text-creata-ink hover:text-creata-coral underline underline-offset-2"
            data-testid="cart-item-remove-button"
          >
            DEL
          </button>
        </div>

        {error && (
          <p className="text-xs font-semibold text-rose-700" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

const CartDropdown = ({
  cart: serverCart,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const [clientCart, setClientCart] = useState<HttpTypes.StoreCart | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const cartState = clientCart ?? serverCart
  const totalItems = countItems(cartState)
  const subtotal = cartState?.subtotal ?? 0

  useEffect(() => {
    let active = true

    const syncCart = (shouldOpen = false) => {
      retrieveCart()
        .then((cart) => {
          if (!active) return
          setClientCart(cart)
          if (
            shouldOpen &&
            !pathname.includes("/cart") &&
            !pathname.includes("/checkout")
          ) {
            setIsOpen(true)
          }
        })
        .catch(() => {})
    }

    if (!serverCart) {
      syncCart(false)
    }

    const handleCartUpdated = (event: Event) => {
      const detail = (event as CustomEvent<CartUpdatedDetail>)?.detail
      syncCart(Boolean(detail?.openDrawer))
    }

    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdated)
    return () => {
      active = false
      window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdated)
    }
  }, [serverCart, pathname])

  const close = () => setIsOpen(false)

  const sortedItems = cartState?.items
    ? [...cartState.items].sort((a, b) =>
        (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
      )
    : []

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-creata-ink bg-creata-yellow text-creata-ink font-mono text-xs font-bold uppercase shadow-zine hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111111] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_#111111] transition-all duration-150"
        aria-label={`Open print bag (${totalItems} items)`}
        data-testid="nav-cart-link"
      >
        <span>CART</span>
        <span>[{totalItems}]</span>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[80]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-creata-ink/45" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-out duration-250"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel
                  className="pointer-events-auto w-screen max-w-[430px] flex flex-col bg-creata-cream border-l-2 border-creata-ink"
                  data-testid="nav-cart-dropdown"
                >
                  <div className="px-5 py-4 bg-creata-yellow border-b-2 border-creata-ink flex items-center justify-between">
                    <div>
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-creata-ink">
                        CREATA 3D // {totalItems}{" "}
                        {totalItems === 1 ? "ITEM" : "ITEMS"}
                      </span>
                      <Dialog.Title className="font-display font-extrabold text-xl uppercase text-creata-ink">
                        Print Bag
                      </Dialog.Title>
                    </div>
                    <button
                      type="button"
                      onClick={close}
                      aria-label="Close bag"
                      className="w-9 h-9 border-2 border-creata-ink bg-white shadow-zine-sm hover:bg-creata-mint flex items-center justify-center text-creata-ink transition-colors"
                    >
                      <XMark />
                    </button>
                  </div>

                  {cartState && sortedItems.length > 0 ? (
                    <>
                      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3.5">
                        {sortedItems.map((item) => (
                          <CartDrawerItem
                            key={item.id}
                            item={item}
                            currencyCode={cartState.currency_code}
                            onNavigate={close}
                            onMutated={() => {
                              notifyCartUpdated()
                              router.refresh()
                            }}
                          />
                        ))}
                      </div>

                      <div className="px-5 py-5 bg-white border-t-2 border-dashed border-creata-ink flex flex-col gap-3.5">
                        <div className="flex items-baseline justify-between font-mono">
                          <span className="text-xs font-bold uppercase text-creata-muted">
                            SUBTOTAL
                          </span>
                          <span
                            className="text-xl font-bold text-creata-ink"
                            data-testid="cart-subtotal"
                            data-value={subtotal}
                          >
                            {convertToLocale({
                              amount: subtotal,
                              currency_code: cartState.currency_code,
                            })}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <LocalizedClientLink
                            href="/cart"
                            onClick={close}
                            className="h-12 px-4 border-2 border-creata-ink bg-white hover:bg-creata-yellow text-creata-ink font-mono text-xs font-bold uppercase shadow-zine-sm inline-flex items-center justify-center transition-all"
                            data-testid="go-to-cart-button"
                          >
                            View Bag
                          </LocalizedClientLink>
                          <LocalizedClientLink
                            href="/checkout"
                            onClick={close}
                            className="h-12 px-4 border-2 border-creata-ink bg-creata-coral text-creata-ink font-mono text-xs font-bold uppercase shadow-zine hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111111] inline-flex items-center justify-between transition-all"
                          >
                            <span>Checkout</span>
                            <span aria-hidden="true">→</span>
                          </LocalizedClientLink>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-16 gap-4">
                      <div className="w-12 h-12 border-2 border-creata-ink bg-creata-yellow shadow-zine-sm grid place-items-center font-mono text-sm font-bold text-creata-ink">
                        0
                      </div>
                      <div>
                        <p className="font-display font-extrabold text-xl uppercase text-creata-ink">
                          Bag is empty.
                        </p>
                        <p className="text-sm text-creata-muted mt-1">
                          Add an object or stamp a custom name in the Print Lab.
                        </p>
                      </div>
                      <LocalizedClientLink
                        href="/store"
                        onClick={close}
                        className="mt-2 px-6 py-3 border-2 border-creata-ink bg-creata-coral text-creata-ink font-mono text-xs font-bold uppercase shadow-zine hover:-translate-x-0.5 hover:-translate-y-0.5 inline-flex items-center gap-2 transition-all"
                      >
                        <span>Explore Objects</span>
                        <span aria-hidden="true">↗</span>
                      </LocalizedClientLink>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CartDropdown
