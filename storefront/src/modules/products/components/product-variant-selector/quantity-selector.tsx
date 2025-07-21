import React from "react"
import { Button } from "@medusajs/ui"

type QuantitySelectorProps = {
  quantity: number
  onQuantityChange: (quantity: number) => void
  availability: "in_stock" | "available_soon" | "unavailable"
  variantTitle?: string // Add variant title prop
  onAddToCart?: () => void // Add cart function
  isAdding?: boolean // Add loading state
  totalPrice?: number // Add total price for button text
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  availability,
  variantTitle,
  onAddToCart,
  isAdding = false,
  totalPrice = 0,
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
    <div className="p-3 bg-white rounded-lg border shadow-sm border-accent/20">
      {/* Variant title - prominent display */}
      {variantTitle && (
        <div className="pb-2 mb-3 border-b border-accent/10">
          <h3 className="text-lg font-bold leading-tight text-accent-dark">
            {variantTitle}
          </h3>
        </div>
      )}
      
      <label className="block mb-2 text-sm font-semibold text-accent-dark">
        Počet balíkov
      </label>
      
      <div className="flex gap-2 items-center">
        <Button
          variant="secondary"
          size="small"
          onClick={handleDecrease}
          disabled={quantity <= 1 || isDisabled}
          className="flex justify-center items-center p-0 w-9 h-9 font-bold rounded-lg transition-colors bg-accent/10 hover:bg-accent/20 border-accent/30 text-accent-dark"
        >
          −
        </Button>
        
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          disabled={isDisabled}
          min="1"
          className="w-16 h-9 font-semibold text-center rounded-lg border border-accent/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 text-accent-dark disabled:opacity-50 disabled:cursor-not-allowed"
        />
        
        <Button
          variant="secondary"
          size="small"
          onClick={handleIncrease}
          disabled={isDisabled}
          className="flex justify-center items-center p-0 w-9 h-9 font-bold rounded-lg transition-colors bg-accent/10 hover:bg-accent/20 border-accent/30 text-accent-dark"
        >
          +
        </Button>
        
        <span className="ml-2 text-sm font-medium text-gray-600">
          ks
        </span>
      </div>
      
      {availability === "unavailable" && (
        <p className="mt-2 text-xs font-medium text-red-600">
          Tento variant nie je momentálne dostupný
        </p>
      )}

      {/* Add to cart button */}
      {onAddToCart && (
        <div className="mt-4">
          <Button
            onClick={onAddToCart}
            disabled={availability === "unavailable" || isAdding}
            className="px-6 py-3 w-full text-base font-bold text-white bg-gradient-to-r rounded-lg shadow-md transition-all duration-300 from-accent-dark via-accent to-accent-light hover:from-accent hover:to-accent-light disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            isLoading={isAdding}
          >
            {isAdding ? "Pridávam..." : 
             availability === "unavailable" ? "Nedostupné" :
             `Pridať do košíka - ${totalPrice.toFixed(2)} €`}
          </Button>
        </div>
      )}
    </div>
  )
}

export default QuantitySelector 