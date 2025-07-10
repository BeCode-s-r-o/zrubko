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
        "px-6 py-3 text-white border-2 transition-all duration-300 bg-gradient-to-r from-gold to-gold-dark border-gold hover:from-gold-dark hover:to-gold hover:border-gold-dark hover:scale-105 text-[18px] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
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
