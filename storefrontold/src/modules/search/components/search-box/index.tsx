// Deprecated: This file used Algolia hooks. Use Meilisearch-based components instead.

import { MagnifyingGlass, XMarkMini } from "@medusajs/icons"
import { FormEvent } from "react"
import { useRouter } from "next/navigation"

import SearchBoxWrapper, {
  ControlledSearchBoxProps,
} from "../search-box-wrapper"

const ControlledSearchBox = ({
  inputRef,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  value,
  ...props
}: ControlledSearchBoxProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (onSubmit) {
      onSubmit(event)
    }

    inputRef.current?.blur()
  }

  const handleReset = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    onReset(event)
    inputRef.current?.focus()
  }

  return (
    <div {...props} className="w-full">
      <form noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <div className="flex relative items-center px-4 py-2 w-full bg-white rounded-md border border-gray-300">
          <span className="absolute left-6 top-1/2 -translate-y-1/2">
            <MagnifyingGlass className="w-5 text-gray-500" />
          </span>

          <input
            ref={inputRef}
            data-testid="search-input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={placeholder || "Hľadať produkty..."}
            spellCheck={false}
            type="search"
            value={value}
            onChange={onChange}
            className="flex-1 pl-10 text-base bg-transparent placeholder:text-gray-500 focus:outline-none"
          />

          {value && (
            <button
              onClick={handleReset}
              type="button"
              className="ml-2 text-gray-500 hover:text-black"
            >
              <XMarkMini className="w-4 h-4s" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

const SearchBox = () => {
  const router = useRouter()

  return (
    <SearchBoxWrapper>
      {(props) => <ControlledSearchBox {...props} />}
    </SearchBoxWrapper>
  )
}

export default SearchBox
