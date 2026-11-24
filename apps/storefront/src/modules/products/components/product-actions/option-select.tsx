import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  name: string
  disabled: boolean
  "data-testid"?: string
}

const COLOR_KEYWORDS: [RegExp, string][] = [
  [/cobalt|royal/i, "#2653FF"],
  [/blue|navy|ocean/i, "#58A6FF"],
  [/lime|acid|neon|mint/i, "#B8F25A"],
  [/sage|olive|green/i, "#6EB87E"],
  [/tangerine|coral|orange|terracotta/i, "#FF5E3A"],
  [/red|crimson|ruby/i, "#DC3F37"],
  [/yellow|butter|gold|sunshine|mustard/i, "#FFE14D"],
  [/lilac|lavender|violet|purple/i, "#C9B6FF"],
  [/pink|rose|blush/i, "#F472B6"],
  [/chalk|cream|ivory|white|sand|beige/i, "#FBF8F1"],
  [/obsidian|black|charcoal|ink/i, "#1F1F1D"],
  [/gr[ae]y|slate|silver|stone/i, "#96948B"],
  [/brown|walnut|wood|bronze/i, "#8D6346"],
]

const resolveColorHex = (optionTitle: string, value: string): string | null => {
  if (!/(colou?r|filament|shade|finish)/i.test(optionTitle)) {
    return null
  }
  const hit = COLOR_KEYWORDS.find(([pattern]) => pattern.test(value))
  return hit ? hit[1] : null
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  name,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <fieldset className="flex flex-col gap-2.5 p-0 border-0" disabled={disabled}>
      <legend className="w-full flex items-center justify-between font-mono text-xs font-bold uppercase text-creata-ink mb-2">
        <span>{title}</span>
        {current && (
          <span className="px-2 py-0.5 bg-creata-yellow border border-creata-ink text-[11px]">
            {current}
          </span>
        )}
      </legend>
      <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
        {filteredOptions.map((v) => {
          const id = `${name}-${v}`.replace(/[^A-Za-z0-9_-]/g, "-")
          const isSelected = v === current
          const swatchHex = resolveColorHex(title, v)

          return (
            <div key={v}>
              <input
                type="radio"
                id={id}
                name={name}
                value={v}
                checked={isSelected}
                onChange={() => updateOption(option.id, v)}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className={clx(
                  "min-h-[40px] px-3.5 border-[1.5px] border-creata-ink font-mono text-xs font-bold uppercase inline-flex items-center gap-2 cursor-pointer transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-creata-ink peer-focus-visible:ring-offset-2 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
                  {
                    "bg-creata-ink text-creata-yellow shadow-none translate-x-[1px] translate-y-[1px]":
                      isSelected,
                    "bg-white text-creata-ink shadow-zine-sm hover:bg-creata-mint":
                      !isSelected,
                  }
                )}
                data-testid="option-button"
              >
                {swatchHex && (
                  <span
                    className="w-3.5 h-3.5 shrink-0 border border-creata-ink"
                    style={{ backgroundColor: swatchHex }}
                    aria-hidden="true"
                  />
                )}
                <span>{v}</span>
              </label>
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}

export default OptionSelect
