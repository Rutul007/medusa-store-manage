import { Text, clx } from "@modules/common/components/ui"
import { VariantPrice } from "types/global"

export default function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <span className="inline-flex items-baseline gap-1.5 px-2 py-0.5 bg-creata-yellow border-[1.5px] border-creata-ink font-mono text-xs font-bold text-creata-ink">
      {price.price_type === "sale" && (
        <Text
          as="span"
          className="line-through text-[11px] font-normal text-creata-muted"
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}
      <Text
        as="span"
        className={clx("font-mono text-xs font-bold text-creata-ink", {
          "text-creata-coral": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>
    </span>
  )
}
