import { NextResponse } from "next/server"
import { retrieveCart } from "@lib/data/cart"

export async function GET() {
  try {
    const cart = await retrieveCart()
    
    if (!cart) {
      return NextResponse.json({ cart: null, itemCount: 0 })
    }

    const itemCount = cart.items?.reduce((acc, item) => {
      return acc + (item.quantity || 0)
    }, 0) || 0

    return NextResponse.json({ 
      cart: {
        id: cart.id,
        items: cart.items,
      },
      itemCount 
    })
  } catch (error: any) {
    console.error("[API /cart] Error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch cart" },
      { status: 500 }
    )
  }
}

