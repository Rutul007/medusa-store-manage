"use client"

import clsx from "clsx"
import { useRefinementList } from "react-instantsearch"

type RefinementGroupProps = {
  attribute: string
  title: string
}

const RefinementGroup = ({ attribute, title }: RefinementGroupProps) => {
  const { items, refine } = useRefinementList({
    attribute,
    limit: 20,
    sortBy: ["count:desc", "name:asc"],
  })

  if (!items.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-2.5 border-t-2 border-dashed border-creata-ink pt-4">
      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-creata-ink">
        {title}
      </span>
      <ul className="flex flex-col gap-y-2">
        {items.map((item) => (
          <li key={item.value}>
            <label className="flex cursor-pointer items-center gap-x-2.5">
              <input
                type="checkbox"
                checked={item.isRefined}
                onChange={() => refine(item.value)}
                className="h-4 w-4 shrink-0 border-2 border-creata-ink accent-creata-ink"
                data-testid={`refinement-${attribute}`}
              />
              <span
                className={clsx("text-sm min-w-0 break-words flex-1", {
                  "text-creata-ink font-bold": item.isRefined,
                  "text-creata-muted hover:text-creata-ink font-medium":
                    !item.isRefined,
                })}
              >
                {item.label}
              </span>
              <span className="font-mono text-[11px] font-bold shrink-0 text-creata-muted">
                [{item.count}]
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RefinementGroup
