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
        "px-6 py-3 text-white border-2 transition duration-300 bg-accent border-accent hover:bg-accent-dark hover:border-accent-light text-[18px] disabled:opacity-50 disabled:cursor-not-allowed",
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
