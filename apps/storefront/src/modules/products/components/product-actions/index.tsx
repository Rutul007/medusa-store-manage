"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { notifyCartUpdated } from "@lib/util/cart-events"
import { isVariantInStock } from "@lib/util/inventory"
import {
  getPersonalizationError,
  getPersonalizationSettings,
} from "@lib/util/personalization"
import { HttpTypes } from "@medusajs/types"
import Divider from "@modules/common/components/divider"
import { Button } from "@modules/common/components/ui"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useRouter } from "next/navigation"
import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

const getDefaultVariant = (product: HttpTypes.StoreProduct) =>
  product.variants?.find(isVariantInStock) ?? product.variants?.[0]

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [options, setOptions] = useState<Record<string, string | undefined>>(
    () => optionsAsKeymap(getDefaultVariant(product)?.options ?? null) ?? {}
  )
  const [isUrlVariantApplied, setIsUrlVariantApplied] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [personalization, setPersonalization] = useState("")
  const [personalizationError, setPersonalizationError] = useState<
    string | null
  >(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const countryCode = useParams().countryCode as string
  const personalizationSettings = getPersonalizationSettings(product)
  const personalizationInputRef = useRef<HTMLInputElement>(null)

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const variantId = new URLSearchParams(window.location.search).get("v_id")
    const variant = product.variants?.find((v) => v.id === variantId)
    if (variant) {
      setOptions(optionsAsKeymap(variant.options) ?? {})
    }
    setIsUrlVariantApplied(true)
  }, [product.variants])

  useEffect(() => {
    if (!isUrlVariantApplied) {
      return
    }

    const params = new URLSearchParams(window.location.search)
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant, isUrlVariantApplied, pathname, router])

  const inStock = useMemo(
    () => isVariantInStock(selectedVariant),
    [selectedVariant]
  )

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    if (personalizationSettings) {
      const error = getPersonalizationError(
        personalization,
        personalizationSettings
      )
      if (error) {
        setPersonalizationError(error)
        personalizationInputRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
        personalizationInputRef.current?.focus()
        return null
      }
    }

    setIsAdding(true)
    setPersonalizationError(null)
    setActionError(null)

    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
        countryCode,
        personalization:
          personalizationSettings && personalization.trim()
            ? { answer: personalization.trim() }
            : undefined,
      })
      notifyCartUpdated({ openDrawer: true })
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Could not add this item to your cart."
      )
    } finally {
      setIsAdding(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleAddToCart()
  }

  const previewText = (
    personalization.trim() ||
    personalizationSettings?.placeholder ||
    "YOUR TEXT"
  ).toUpperCase()

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <form
          method="post"
          action={`/${countryCode}/cart/add`}
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-5"
          {...{
            toolname: "add_to_cart",
            tooldescription:
              "Add the selected product variant to the shopping cart",
          }}
        >
          <input type="hidden" name="product_id" value={product.id} />
          <input
            type="hidden"
            name="variant_id"
            value={isValidVariant ? selectedVariant?.id ?? "" : ""}
          />
          <input type="hidden" name="quantity" value="1" />

          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => (
                <div key={option.id}>
                  <OptionSelect
                    option={option}
                    current={options[option.id]}
                    updateOption={setOptionValue}
                    title={option.title ?? ""}
                    name={`options[${option.id}]`}
                    data-testid="product-options"
                    disabled={!!disabled || isAdding}
                  />
                </div>
              ))}
              <Divider />
            </div>
          )}

          {personalizationSettings && (
            <div className="border-2 border-creata-ink bg-white shadow-zine-md">
              <div className="bg-creata-yellow border-b-2 border-creata-ink px-4 py-2.5 flex items-center justify-between gap-2 font-mono text-[11px] font-bold uppercase text-creata-ink">
                <span>PRINT LAB // CUSTOM RELIEF</span>
                <span>
                  {personalizationSettings.required ? "REQUIRED" : "OPTIONAL"}
                </span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col gap-4">
                <div
                  className="zine-blueprint border-2 border-creata-ink p-4 flex flex-col items-center justify-center gap-2"
                  aria-hidden="true"
                >
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-creata-ink">
                    LIVE PROOF STAMP
                  </span>
                  <div className="px-5 py-2.5 bg-creata-yellow border-[3px] border-creata-ink shadow-zine font-display font-extrabold text-base sm:text-xl tracking-wide text-creata-ink text-center break-words max-w-full">
                    {previewText}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="font-mono text-xs font-bold uppercase text-creata-ink"
                    htmlFor="product-personalization"
                  >
                    {personalizationSettings.question}
                    {personalizationSettings.required && (
                      <span className="text-creata-coral" aria-hidden="true">
                        {" "}
                        *
                      </span>
                    )}
                  </label>
                  <input
                    ref={personalizationInputRef}
                    id="product-personalization"
                    className={`w-full h-12 px-3.5 border-2 font-display font-extrabold text-base text-creata-ink bg-creata-cream shadow-zine-sm outline-none transition-colors focus:bg-creata-yellow/45 ${
                      personalizationError
                        ? "border-rose-600"
                        : "border-creata-ink"
                    }`}
                    name="personalization_answer"
                    type="text"
                    value={personalization}
                    placeholder={personalizationSettings.placeholder}
                    maxLength={personalizationSettings.maxLength}
                    required={personalizationSettings.required}
                    aria-invalid={Boolean(personalizationError)}
                    aria-describedby={
                      personalizationError
                        ? "product-personalization-error"
                        : "product-personalization-count"
                    }
                    onChange={(event) => {
                      setPersonalization(event.target.value)
                      setPersonalizationError(null)
                    }}
                    disabled={isAdding || !!disabled}
                  />
                  {personalizationError ? (
                    <p
                      className="font-mono text-xs font-bold text-rose-700"
                      id="product-personalization-error"
                      role="alert"
                    >
                      {personalizationError}
                    </p>
                  ) : (
                    <p
                      className="font-mono text-[11px] font-bold text-creata-muted uppercase"
                      id="product-personalization-count"
                    >
                      {personalization.length} /{" "}
                      {personalizationSettings.maxLength} CHARS
                      {!personalizationSettings.required && " · OPTIONAL"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-1">
            <ProductPrice product={product} variant={selectedVariant} />

            {selectedVariant && isValidVariant && (
              <span
                className={`zine-sticker px-3 py-1 font-mono text-[11px] font-bold uppercase ${
                  inStock
                    ? "bg-creata-mint text-creata-ink"
                    : "bg-creata-surface text-creata-muted"
                }`}
                data-testid="product-availability"
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
            )}
          </div>

          <Button
            type="submit"
            disabled={
              !inStock ||
              !selectedVariant ||
              !!disabled ||
              isAdding ||
              !isValidVariant
            }
            variant="primary"
            className="w-full h-[54px] text-sm"
            isLoading={isAdding}
            data-testid="add-product-button"
          >
            {!selectedVariant
              ? "Select Variant"
              : !inStock || !isValidVariant
              ? "Out of Stock"
              : "+ Add To Print Bag"}
          </Button>
          {actionError && (
            <p className="font-mono text-xs font-bold text-rose-700" role="alert">
              {actionError}
            </p>
          )}
        </form>
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
