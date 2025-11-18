import { Button } from "@medusajs/ui"
import { ReactNode } from "react"
import clsx from "clsx"

type PrimaryButtonProps = {
  href?: string
  children: ReactNode
  className?: string
  icon?: ReactNode
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

const PrimaryButton = ({ href, children, className, icon, type = "button", disabled }: PrimaryButtonProps) => {
  const content = (
    <Button
      type={type}
      disabled={disabled}
      className={clsx(
        "px-8 py-4 text-white bg-primary border border-primary hover:bg-primary/90 hover:border-primary/90 font-medium text-base transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:hover:border-primary",
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Button>
  )

  return href ? <a href={href}>{content}</a> : content
}

export default PrimaryButton
