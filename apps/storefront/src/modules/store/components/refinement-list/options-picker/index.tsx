"use client"

import * as Accordion from "@radix-ui/react-accordion"
import { useEffect, useState } from "react"

import { ChevronDownMini } from "@medusajs/icons"
import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import clsx from "clsx"

type OptionsPickerProps = {
  selectedValueIds: string[]
  setOptionValueIds: (valueIds: string[]) => void
}

const OptionsPicker = ({
  selectedValueIds,
  setOptionValueIds,
}: OptionsPickerProps) => {
  const [options, setOptions] = useState<HttpTypes.StoreProductOption[]>([])
  const [closedIds, setClosedIds] = useState<string[]>([])

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await sdk.client.fetch<{
          product_options?: HttpTypes.StoreProductOption[]
        }>("/store/product-options", {
          method: "GET",
          query: {
            is_exclusive: false,
            fields: "*values",
          },
        })

        if (response?.product_options) {
          setOptions(response.product_options)
        }
      } catch (error) {
        console.error("Failed to fetch product options", error)
      }
    }

    fetchOptions()
  }, [])

  if (!options.length) {
    return null
  }

  const openItems = options
    .map((option) => option.id)
    .filter((id) => !closedIds.includes(id))

  return (
    <div className="flex flex-col gap-y-3 border-t-2 border-dashed border-creata-ink pt-4">
      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-creata-ink">
        Options
      </span>
      <Accordion.Root
        type="multiple"
        value={openItems}
        onValueChange={(nextOpen) =>
          setClosedIds(
            options
              .map((option) => option.id)
              .filter((id) => !nextOpen.includes(id))
          )
        }
        className="flex flex-col gap-y-2"
      >
        {options.map((option) => {
          const values =
            option.values
              ?.map((value) => ({
                id: value.id,
                label: value.value,
              }))
              .filter(
                (value): value is { id: string; label: string } =>
                  !!value.id && !!value.label
              ) || []

          if (!values.length) {
            return null
          }

          const toggleValue = (valueId: string) => {
            const isSelected = selectedValueIds.includes(valueId)
            const nextSelections = isSelected
              ? selectedValueIds.filter((id) => id !== valueId)
              : [...selectedValueIds, valueId]

            setOptionValueIds(Array.from(new Set(nextSelections)))
          }

          const isOpen = openItems.includes(option.id)
          const selectedCount = values.filter((value) =>
            selectedValueIds.includes(value.id)
          ).length

          return (
            <Accordion.Item
              key={option.id}
              value={option.id}
              className="overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between py-2 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-creata-ink">
                      {option.title || "Option"}
                    </span>
                    {selectedCount > 0 && (
                      <span className="px-1.5 py-0.5 bg-creata-yellow border border-creata-ink font-mono text-[10px] font-bold">
                        {selectedCount}
                      </span>
                    )}
                  </div>
                  <span
                    className={clsx(
                      "flex h-6 w-6 items-center justify-center text-creata-ink transition-transform duration-150",
                      {
                        "rotate-180": isOpen,
                      }
                    )}
                  >
                    <ChevronDownMini />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="pb-3 pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {values.map((value) => {
                    const isSelected = selectedValueIds.includes(value.id)

                    return (
                      <button
                        key={value.id}
                        type="button"
                        onClick={() => toggleValue(value.id)}
                        className={clsx(
                          "border-[1.5px] border-creata-ink font-mono text-[11px] font-bold h-8 px-2.5 flex items-center shadow-zine-sm transition-all",
                          {
                            "bg-creata-ink text-creata-yellow translate-x-[1px] translate-y-[1px] shadow-none":
                              isSelected,
                            "bg-white text-creata-ink hover:bg-creata-mint":
                              !isSelected,
                          }
                        )}
                        aria-pressed={isSelected}
                      >
                        {value.label}
                      </button>
                    )
                  })}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          )
        })}
      </Accordion.Root>
    </div>
  )
}

export default OptionsPicker
