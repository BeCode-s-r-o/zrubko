import { Button } from "@medusajs/ui"
import { ReactNode } from "react"
import clsx from "clsx"

type LightButtonProps = {
  href?: string
  children: ReactNode
  className?: string
  icon?: ReactNode
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

const LightButton = ({ href, children, className, icon, type = "button", disabled }: LightButtonProps) => {
  const content = (
    <Button
      type={type}
      disabled={disabled}
      variant="secondary"
      className={clsx(
        "px-8 py-4 text-black bg-transparent border border-black/30 hover:border-black hover:bg-black hover:text-white font-medium text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black",
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Button>
  )

  return href ? <a href={href}>{content}</a> : content
}

export default LightButton
