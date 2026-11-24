import { Dialog, Transition } from "@headlessui/react"
import { Button, clx } from "@modules/common/components/ui"
import React, { Fragment, useMemo } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import { getProductPrice } from "@lib/util/get-product-price"
import { isSimpleProduct } from "@lib/util/product"
import { HttpTypes } from "@medusajs/types"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"
import OptionSelect from "./option-select"

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (title: string, value: string) => void
  inStock?: boolean
  handleAddToCart: () => void
  isAdding?: boolean
  show: boolean
  optionsDisabled: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { state, open, close } = useToggleState()

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
  })

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null
    }
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const isSimple = isSimpleProduct(product)

  return (
    <>
      <div
        className={clx("lg:hidden inset-x-0 bottom-0 fixed z-50", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-250"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="bg-creata-cream flex flex-col gap-y-2.5 justify-center items-center p-4 w-full border-t-2 border-creata-ink"
            data-testid="mobile-actions"
          >
            <div className="flex items-center justify-between w-full gap-x-2 text-sm">
              <span
                className="font-display font-extrabold uppercase text-creata-ink truncate"
                data-testid="mobile-title"
              >
                {product.title}
              </span>
              {selectedPrice && (
                <div className="flex items-baseline gap-x-2 px-2 py-0.5 bg-creata-yellow border-[1.5px] border-creata-ink font-mono text-xs font-bold text-creata-ink shrink-0">
                  {selectedPrice.price_type === "sale" && (
                    <span className="line-through text-[11px] font-normal text-creata-muted">
                      {selectedPrice.original_price}
                    </span>
                  )}
                  <span
                    className={clx({
                      "text-creata-coral": selectedPrice.price_type === "sale",
                    })}
                  >
                    {selectedPrice.calculated_price}
                  </span>
                </div>
              )}
            </div>
            <div
              className={clx("grid grid-cols-2 w-full gap-2.5", {
                "!grid-cols-1": isSimple,
              })}
            >
              {!isSimple && (
                <Button
                  type="button"
                  onClick={open}
                  variant="secondary"
                  className="w-full h-11 text-xs"
                  data-testid="mobile-actions-button"
                >
                  <div className="flex items-center justify-between w-full gap-1">
                    <span className="truncate">
                      {variant
                        ? Object.values(options).join(" / ")
                        : "Options"}
                    </span>
                    <ChevronDown />
                  </div>
                </Button>
              )}
              <Button
                type="button"
                onClick={handleAddToCart}
                disabled={!inStock || !variant}
                className="w-full h-11 text-xs"
                isLoading={isAdding}
                data-testid="mobile-cart-button"
              >
                {!variant
                  ? "Select Variant"
                  : !inStock
                  ? "Out of Stock"
                  : "+ Add To Bag"}
              </Button>
            </div>
          </div>
        </Transition>
      </div>
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-250"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-creata-ink/45" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <div className="flex min-h-full h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-250"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel
                  className="w-full h-full transform overflow-hidden text-left flex flex-col gap-y-3"
                  data-testid="mobile-actions-modal"
                >
                  <div className="w-full flex justify-end pr-5">
                    <button
                      type="button"
                      onClick={close}
                      className="bg-creata-yellow border-2 border-creata-ink shadow-zine-sm w-11 h-11 text-creata-ink flex justify-center items-center"
                      data-testid="close-modal-button"
                      aria-label="Close"
                    >
                      <X />
                    </button>
                  </div>
                  <div className="bg-creata-cream border-t-2 border-creata-ink px-6 py-8">
                    {(product.variants?.length ?? 0) > 1 && (
                      <div className="flex flex-col gap-y-5">
                        {(product.options || []).map((option) => (
                          <div key={option.id}>
                            <OptionSelect
                              option={option}
                              current={options[option.id]}
                              updateOption={updateOptions}
                              title={option.title ?? ""}
                              name={`mobile-options[${option.id}]`}
                              disabled={optionsDisabled}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions
