"use client"

import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDownMini } from "@medusajs/icons"
import clsx from "clsx"
import { useState } from "react"
import { useRefinementList } from "react-instantsearch"

import { OPTION_VALUES_ATTRIBUTE } from "./attributes"

const FACET_LIMIT = 200

type OptionGroup = {
  title: string
  values: {
    label: string
    value: string
    count: number
    isRefined: boolean
  }[]
}

function groupItems(
  items: ReturnType<typeof useRefinementList>["items"]
): OptionGroup[] {
  const groups = new Map<string, OptionGroup>()

  for (const item of items) {
    const separator = item.label.indexOf(":")

    if (separator < 1) {
      continue
    }

    const title = item.label.slice(0, separator)
    const label = item.label.slice(separator + 1)

    if (!groups.has(title)) {
      groups.set(title, { title, values: [] })
    }

    groups.get(title)!.values.push({
      label,
      value: item.value,
      count: item.count,
      isRefined: item.isRefined,
    })
  }

  return Array.from(groups.values())
}

const OptionRefinements = () => {
  const { items, refine } = useRefinementList({
    attribute: OPTION_VALUES_ATTRIBUTE,
    limit: FACET_LIMIT,
    sortBy: ["name:asc"],
    operator: "and",
  })
  const [closedGroups, setClosedGroups] = useState<string[]>([])

  const groups = groupItems(items)

  if (!groups.length) {
    return null
  }

  return (
    <Accordion.Root
      type="multiple"
      value={groups
        .map((group) => group.title)
        .filter((title) => !closedGroups.includes(title))}
      onValueChange={(openTitles) =>
        setClosedGroups(
          groups
            .map((group) => group.title)
            .filter((title) => !openTitles.includes(title))
        )
      }
      className="flex flex-col gap-y-2 border-t-2 border-dashed border-creata-ink pt-4"
    >
      {groups.map((group) => {
        const isOpen = !closedGroups.includes(group.title)
        const selectedCount = group.values.filter(
          (value) => value.isRefined
        ).length

        return (
          <Accordion.Item
            key={group.title}
            value={group.title}
            className="overflow-hidden"
          >
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between py-2 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-creata-ink">
                    {group.title}
                  </span>
                  {selectedCount > 0 && (
                    <span className="px-1.5 py-0.5 bg-creata-yellow border border-creata-ink font-mono text-[10px] font-bold text-creata-ink">
                      {selectedCount}
                    </span>
                  )}
                </div>
                <span
                  className={clsx(
                    "flex h-6 w-6 items-center justify-center text-creata-ink transition-transform duration-150",
                    { "rotate-180": isOpen }
                  )}
                >
                  <ChevronDownMini />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="pb-3 pt-1">
              <div className="flex flex-wrap gap-1.5">
                {group.values.map((value) => (
                  <button
                    key={value.value}
                    type="button"
                    onClick={() => refine(value.value)}
                    aria-pressed={value.isRefined}
                    className={clsx(
                      "border-[1.5px] border-creata-ink font-mono text-[11px] font-bold h-8 px-2.5 flex items-center gap-x-1.5 shadow-zine-sm transition-all",
                      {
                        "bg-creata-ink text-creata-yellow translate-x-[1px] translate-y-[1px] shadow-none":
                          value.isRefined,
                        "bg-white text-creata-ink hover:bg-creata-mint":
                          !value.isRefined,
                      }
                    )}
                    data-testid="option-refinement"
                  >
                    <span>{value.label}</span>
                    <span className="opacity-75">[{value.count}]</span>
                  </button>
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        )
      })}
    </Accordion.Root>
  )
}

export default OptionRefinements
