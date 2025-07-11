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
        "px-8 py-4 text-black bg-white border border-black/10 hover:bg-black hover:text-white font-medium text-base transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black",
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
