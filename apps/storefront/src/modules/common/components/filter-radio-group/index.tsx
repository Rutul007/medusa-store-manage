import { Label, RadioGroup, clx } from "@modules/common/components/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: string
  handleChange: (value: string) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-y-2.5">
      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-creata-ink">
        {title}
      </span>
      <RadioGroup className="gap-1.5" data-testid={dataTestId}>
        {items?.map((i) => {
          const isSelected = i.value === value
          return (
            <div key={i.value} className="flex items-center gap-2">
              <RadioGroup.Item
                checked={isSelected}
                onChange={() => handleChange(i.value)}
                className="sr-only peer"
                id={i.value}
                value={i.value}
              />
              <Label
                htmlFor={i.value}
                className={clx(
                  "flex items-center justify-between w-full px-3 py-2 border-[1.5px] border-creata-ink font-mono text-[11px] font-bold uppercase cursor-pointer transition-all",
                  {
                    "bg-creata-ink text-creata-yellow shadow-none translate-x-[1px] translate-y-[1px]":
                      isSelected,
                    "bg-creata-cream text-creata-ink shadow-zine-sm hover:bg-creata-mint":
                      !isSelected,
                  }
                )}
                data-testid="radio-label"
                data-active={isSelected}
              >
                <span>{i.label}</span>
                {isSelected && <span aria-hidden="true">◆</span>}
              </Label>
            </div>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
