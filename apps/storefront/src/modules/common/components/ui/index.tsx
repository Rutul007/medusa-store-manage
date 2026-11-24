import clsx from "clsx"
import {
  ButtonHTMLAttributes,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react"

export { clsx as clx }

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  as?: "p" | "span" | "div"
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, as: Component = "p", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={clsx("text-sm leading-relaxed text-creata-ink", className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Text.displayName = "Text"

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: "h1" | "h2" | "h3"
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level: Component = "h2", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={clsx(
          "font-display font-extrabold tracking-tight text-creata-ink",
          Component === "h1" && "text-3xl",
          Component === "h2" && "text-2xl",
          Component === "h3" && "text-xl",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Heading.displayName = "Heading"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "transparent"
  size?: "small" | "medium" | "large"
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "medium",
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          "inline-flex gap-2 items-center justify-center font-mono font-bold uppercase tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-creata-ink focus-visible:ring-offset-2 focus-visible:ring-offset-creata-cream disabled:pointer-events-none disabled:opacity-50",
          variant === "primary" &&
            "bg-creata-coral text-creata-ink border-2 border-creata-ink shadow-zine hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111111] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_#111111]",
          variant === "secondary" &&
            "bg-white text-creata-ink border-2 border-creata-ink shadow-zine-sm hover:bg-creata-yellow hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-zine active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          variant === "transparent" &&
            "bg-transparent text-creata-ink border-2 border-transparent hover:border-creata-ink hover:bg-creata-yellow",
          size === "small" && "h-9 px-3.5 text-xs",
          size === "medium" && "h-11 px-5 text-xs",
          size === "large" && "h-12 px-6 text-xs sm:text-sm",
          className
        )}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    )
  }
)
Button.displayName = "Button"

type ContainerProps = HTMLAttributes<HTMLDivElement>

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "bg-white border-2 border-creata-ink shadow-zine p-5",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Container.displayName = "Container"

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  color?: "green" | "red" | "blue" | "orange" | "grey" | "purple"
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, color = "grey", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          "inline-flex items-center px-2.5 py-0.5 border-[1.5px] border-creata-ink shadow-zine-sm font-mono text-[11px] font-bold uppercase tracking-wide",
          color === "green" && "bg-creata-mint text-creata-ink",
          color === "red" && "bg-creata-coral text-white",
          color === "blue" && "bg-creata-lilac text-creata-ink",
          color === "orange" && "bg-creata-yellow text-creata-ink",
          color === "grey" && "bg-creata-surface text-creata-ink",
          color === "purple" && "bg-creata-lilac text-creata-ink",
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)
Badge.displayName = "Badge"

type IconBadgeProps = HTMLAttributes<HTMLSpanElement>

export const IconBadge = forwardRef<HTMLSpanElement, IconBadgeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center bg-creata-yellow border-[1.5px] border-creata-ink p-1.5 text-creata-ink",
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)
IconBadge.displayName = "IconBadge"

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center border-2 border-creata-ink bg-white p-2 text-creata-ink shadow-zine-sm hover:bg-creata-yellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-creata-ink",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
IconButton.displayName = "IconButton"

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={clsx(
          "font-mono text-xs font-bold uppercase tracking-wide text-creata-ink",
          className
        )}
        {...props}
      >
        {children}
      </label>
    )
  }
)
Label.displayName = "Label"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && <Label>{label}</Label>}
        <input
          ref={ref}
          className={clsx(
            "flex h-11 w-full border-2 border-creata-ink bg-creata-cream px-3.5 py-2 text-sm font-medium text-creata-ink shadow-zine-sm placeholder:text-creata-muted focus:bg-creata-yellow/40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

type TableProps = TableHTMLAttributes<HTMLTableElement>

const TableRoot = forwardRef<HTMLTableElement, TableProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <table
        ref={ref}
        className={clsx("w-full caption-bottom text-sm text-creata-ink", className)}
        {...props}
      >
        {children}
      </table>
    )
  }
)
TableRoot.displayName = "Table"

type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={clsx("[&_tr]:border-b-2 [&_tr]:border-creata-ink", className)}
        {...props}
      >
        {children}
      </thead>
    )
  }
)
TableHeader.displayName = "TableHeader"

type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={clsx("[&_tr:last-child]:border-0", className)}
        {...props}
      >
        {children}
      </tbody>
    )
  }
)
TableBody.displayName = "TableBody"

type TableRowProps = HTMLAttributes<HTMLTableRowElement>

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={clsx(
          "border-b border-dashed border-creata-ink transition-colors hover:bg-creata-cream",
          className
        )}
        {...props}
      >
        {children}
      </tr>
    )
  }
)
TableRow.displayName = "TableRow"

type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={clsx(
          "h-12 px-4 text-left align-middle font-mono text-xs font-bold uppercase tracking-wider text-creata-ink [&:has([role=checkbox])]:pr-0",
          className
        )}
        {...props}
      >
        {children}
      </th>
    )
  }
)
TableHead.displayName = "TableHead"

type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={clsx(
          "p-4 align-middle text-creata-ink [&:has([role=checkbox])]:pr-0",
          className
        )}
        {...props}
      >
        {children}
      </td>
    )
  }
)
TableCell.displayName = "TableCell"

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  HeaderCell: TableHead,
  Cell: TableCell,
})

type RadioGroupProps = HTMLAttributes<HTMLDivElement>

const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("flex flex-col gap-2", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
RadioGroupRoot.displayName = "RadioGroup"

type RadioGroupItemProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="radio"
          id={id}
          className={clsx(
            "h-4 w-4 border-2 border-creata-ink text-creata-ink focus:ring-creata-ink accent-creata-ink",
            className
          )}
          {...props}
        />
        {label && <Label htmlFor={id}>{label}</Label>}
      </div>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
})

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className={clsx(
            "h-4 w-4 border-2 border-creata-ink text-creata-ink focus:ring-creata-ink accent-creata-ink",
            className
          )}
          {...props}
        />
        {label && <Label htmlFor={id}>{label}</Label>}
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"
