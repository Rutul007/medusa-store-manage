import { clx } from "@modules/common/components/ui"

const Divider = ({ className }: { className?: string }) => (
  <div
    className={clx(
      "h-px w-full border-b-2 border-dashed border-creata-ink mt-1",
      className
    )}
  />
)

export default Divider
