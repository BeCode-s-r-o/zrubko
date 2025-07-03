import { Button } from "@medusajs/ui"
import { ReactNode } from "react"
import clsx from "clsx"

import {
    CirclePlay,
  } from "lucide-react"
  

type LightButtonProps = {
  href?: string
  children: ReactNode
  className?: string
  icon?: ReactNode
}

const LightButton = ({ href, children, className, icon }: LightButtonProps) => {
  const content = (
    <Button
      variant="secondary"
      className={clsx(
        "px-6 py-3 text-black bg-white border-2 transition duration-300 text-[18px] border-accent hover:border-gray-300 hover:bg-gray-100",
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
