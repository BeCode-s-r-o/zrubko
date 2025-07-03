import { Button } from "@medusajs/ui"
import { ReactNode } from "react"
import clsx from "clsx"

type PrimaryButtonProps = {
  href?: string
  children: ReactNode
  className?: string
  icon?: ReactNode
}

const PrimaryButton = ({ href, children, className, icon }: PrimaryButtonProps) => {
  const content = (
    <Button
      className={clsx(
        "px-6 py-3 text-white border-2 transition duration-300 bg-accent border-accent hover:bg-accent-dark hover:border-accent-light text-[18px]",
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
