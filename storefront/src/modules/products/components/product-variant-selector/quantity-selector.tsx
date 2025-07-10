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
    <div className="bg-white border border-accent/20 rounded-lg p-4 shadow-sm">
      <label className="block text-sm font-semibold mb-3 text-accent-dark">
        Počet balíkov
      </label>
      
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="small"
          onClick={handleDecrease}
          disabled={quantity <= 1 || isDisabled}
          className="w-9 h-9 p-0 flex items-center justify-center bg-accent/10 hover:bg-accent/20 border-accent/30 text-accent-dark font-bold rounded-lg transition-colors"
        >
          −
        </Button>
        
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          disabled={isDisabled}
          min="1"
          className="w-16 h-9 text-center border border-accent/30 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 font-semibold text-accent-dark disabled:opacity-50 disabled:cursor-not-allowed"
        />
        
        <Button
          variant="secondary"
          size="small"
          onClick={handleIncrease}
          disabled={isDisabled}
          className="w-9 h-9 p-0 flex items-center justify-center bg-accent/10 hover:bg-accent/20 border-accent/30 text-accent-dark font-bold rounded-lg transition-colors"
        >
          +
        </Button>
        
        <span className="text-sm text-gray-600 ml-2 font-medium">
          ks
        </span>
      </div>
      
      {availability === "unavailable" && (
        <p className="text-xs text-red-600 mt-2 font-medium">
          Tento variant nie je momentálne dostupný
        </p>
      )}
    </div>
  )
}

export default QuantitySelector 