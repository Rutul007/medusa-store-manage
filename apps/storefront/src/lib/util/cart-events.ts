export const CART_UPDATED_EVENT = "medusa:cart-updated"

export type CartUpdatedDetail = {
  openDrawer?: boolean
}

/** Lets client-loaded cart UI refresh after a mutation on statically rendered pages. */
export const notifyCartUpdated = (detail?: CartUpdatedDetail | void) => {
  const safeDetail = detail && typeof detail === "object" ? detail : undefined
  window.dispatchEvent(
    new CustomEvent<CartUpdatedDetail>(CART_UPDATED_EVENT, {
      detail: safeDetail,
    })
  )
}
