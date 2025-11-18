import { Label } from "@medusajs/ui"
import React, { useEffect, useImperativeHandle, useState } from "react"

import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, value, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)
    const [hasValue, setHasValue] = useState(Boolean(value && String(value).length > 0))

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useEffect(() => {
      setHasValue(Boolean(value && String(value).length > 0))
    }, [value])

    // Check for autocomplete values
    useEffect(() => {
      const inputElement = inputRef.current
      if (!inputElement) return

      const checkValue = () => {
        const currentValue = inputElement.value
        setHasValue(currentValue.length > 0)
      }
      
      // Check immediately
      checkValue()
      
      // Listen for various events that might indicate autocomplete
      const events = ['input', 'change', 'animationstart']
      events.forEach(event => {
        inputElement.addEventListener(event, checkValue)
      })
      
      // Also check after delays for different browsers
      const timeouts = [100, 500, 1000, 2000].map(delay => 
        setTimeout(checkValue, delay)
      )
      
      return () => {
        events.forEach(event => {
          inputElement.removeEventListener(event, checkValue)
        })
        timeouts.forEach(timeout => clearTimeout(timeout))
      }
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0)
      if (props.onChange) {
        props.onChange(e)
      }
    }

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="flex flex-col w-full">
        {topLabel && (
          <Label className="mb-2 txt-compact-medium-plus">{topLabel}</Label>
        )}
        <div className="flex relative z-0 w-full txt-compact-medium">
          <input
            type={inputType}
            name={name}
            placeholder=" "
            required={required}
            className="block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover"
            {...props}
            onChange={handleInputChange}
            ref={inputRef}
          />
          {label && (
            <label
              htmlFor={name}
              onClick={() => inputRef.current?.focus()}
              className={`flex items-center justify-center mx-3 px-1 absolute -z-1 origin-0 text-ui-fg-subtle text-xs ${
                hasValue ? 'hidden' : 'top-3 scale-100 opacity-100'
              }`}
            >
              <span className="mr-1">{label}</span>
              {required && !hasValue && <span className="text-rose-500 ml-0.5">*</span>}
            </label>
          )}
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-ui-fg-subtle px-4 focus:outline-none transition-all duration-150 outline-none focus:text-ui-fg-base absolute right-0 top-3"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
