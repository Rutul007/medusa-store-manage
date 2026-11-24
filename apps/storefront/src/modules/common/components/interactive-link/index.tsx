import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@modules/common/components/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className="inline-flex gap-x-1.5 items-center group px-3 py-1.5 border-[1.5px] border-creata-ink bg-white hover:bg-creata-yellow shadow-zine-sm font-mono text-xs font-bold uppercase text-creata-ink transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text as="span" className="text-current font-mono text-xs font-bold">
        {children}
      </Text>
      <ArrowUpRightMini className="text-current" />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
