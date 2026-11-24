import { Text, clx } from "@modules/common/components/ui"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import React from "react"

type AccordionItemProps = AccordionPrimitive.AccordionItemProps & {
  title: string
  subtitle?: string
  description?: string
  required?: boolean
  tooltip?: string
  forceMountContent?: true
  headingSize?: "small" | "medium" | "large"
  customTrigger?: React.ReactNode
  complete?: boolean
  active?: boolean
  triggerable?: boolean
  children: React.ReactNode
}

type AccordionProps =
  | (AccordionPrimitive.AccordionSingleProps &
      React.RefAttributes<HTMLDivElement>)
  | (AccordionPrimitive.AccordionMultipleProps &
      React.RefAttributes<HTMLDivElement>)

const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>
} = ({ children, ...props }) => {
  return (
    <AccordionPrimitive.Root {...props}>{children}</AccordionPrimitive.Root>
  )
}

const Item: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  description,
  children,
  className,
  headingSize: _headingSize = "large",
  customTrigger = undefined,
  forceMountContent = undefined,
  triggerable: _triggerable,
  ...props
}) => {
  return (
    <AccordionPrimitive.Item
      {...props}
      className={clx(
        "border-creata-ink group border-b-2 border-dashed last:border-b-0 py-3.5",
        className
      )}
    >
      <AccordionPrimitive.Header>
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between">
            <span className="font-display font-extrabold uppercase text-base text-creata-ink">
              {title}
            </span>
            <AccordionPrimitive.Trigger className="outline-none focus-visible:ring-2 focus-visible:ring-creata-ink">
              {customTrigger || <MorphingTrigger />}
            </AccordionPrimitive.Trigger>
          </div>
          {subtitle && (
            <Text as="span" className="mt-1 text-sm text-creata-muted">
              {subtitle}
            </Text>
          )}
        </div>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content
        forceMount={forceMountContent}
        className={clx(
          "radix-state-closed:animate-accordion-close radix-state-open:animate-accordion-open radix-state-closed:pointer-events-none pt-2"
        )}
      >
        <div className="group-radix-state-closed:animate-accordion-close">
          {description && <Text>{description}</Text>}
          <div className="w-full">{children}</div>
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}

Accordion.Item = Item

const MorphingTrigger = () => {
  return (
    <div className="text-creata-ink border-[1.5px] border-creata-ink bg-creata-cream hover:bg-creata-yellow relative p-1 transition-colors">
      <div className="h-5 w-5 relative">
        <span className="bg-creata-ink group-radix-state-open:rotate-90 absolute inset-y-[30%] left-[46%] right-1/2 w-[2px] duration-300" />
        <span className="bg-creata-ink group-radix-state-open:rotate-90 group-radix-state-open:left-1/2 group-radix-state-open:right-1/2 absolute inset-x-[30%] top-[46%] bottom-1/2 h-[2px] duration-300" />
      </div>
    </div>
  )
}

export default Accordion
