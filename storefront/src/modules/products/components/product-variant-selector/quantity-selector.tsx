import React from "react"
import { Button } from "@medusajs/ui"

type QuantitySelectorProps = {
  quantity: number
  onQuantityChange: (quantity: number) => void
  availability: "in_stock" | "available_soon" | "unavailable"
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  availability,
}) => {
  const isDisabled = availability === "unavailable"

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleIncrease = () => {
    onQuantityChange(quantity + 1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= 1) {
      onQuantityChange(value)
    }
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">
        Počet kusov
      </label>
      
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="small"
          onClick={handleDecrease}
          disabled={quantity <= 1 || isDisabled}
          className="w-10 h-10 p-0 flex items-center justify-center"
        >
          −
        </Button>
        
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          disabled={isDisabled}
          min="1"
          className="w-20 h-10 text-center border rounded-lg border-ui-border-base focus:border-ui-border-interactive focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        
        <Button
          variant="secondary"
          size="small"
          onClick={handleIncrease}
          disabled={isDisabled}
          className="w-10 h-10 p-0 flex items-center justify-center"
        >
          +
        </Button>
        
        <span className="text-sm text-ui-fg-subtle ml-2">
          ks
        </span>
      </div>
      
      {availability === "unavailable" && (
        <p className="text-xs text-red-600 mt-1">
          Tento variant nie je momentálne dostupný
        </p>
      )}
    </div>
  )
}

export default QuantitySelector 