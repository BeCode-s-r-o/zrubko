import { Modules } from "@medusajs/framework/utils"
import { 
  createInventoryItemWithLevelsWorkflow 
} from "../workflows/inventory-management"

export default async (container, config) => {
  const eventBusService = container.resolve("eventBusService")
  const inventoryModuleService = container.resolve(Modules.INVENTORY)

  // Listen for product variant creation to create inventory items
  eventBusService.subscribe("product-variant.created", async (data) => {
    try {
      const { variant } = data.payload
      
      // Create inventory item for the new variant
      await createInventoryItemWithLevelsWorkflow.run({
        input: {
          sku: variant.sku,
          title: variant.title || variant.product?.title || "Product Variant",
          requires_shipping: variant.requires_shipping ?? true,
          location_id: "default", // You should replace this with your actual location ID
          stocked_quantity: 0, // Start with 0 stock
          incoming_quantity: 0,
        }
      })

      console.log(`Created inventory item for variant: ${variant.sku}`)
    } catch (error) {
      console.error("Failed to create inventory item for variant:", error)
    }
  })

  // Listen for order placement to update inventory
  eventBusService.subscribe("order.placed", async (data) => {
    try {
      const { order } = data.payload
      
      // Update inventory levels for each line item
      for (const lineItem of order.items) {
        if (lineItem.variant?.sku) {
          // Find the inventory item
          const inventoryItems = await inventoryModuleService.listInventoryItems({
            sku: lineItem.variant.sku,
          })

          if (inventoryItems.length > 0) {
            const inventoryItem = inventoryItems[0]
            
            // Find inventory levels for this item
            const inventoryLevels = await inventoryModuleService.listInventoryLevels({
              inventory_item_id: inventoryItem.id,
            })

            // Update stock levels
            for (const level of inventoryLevels) {
              await inventoryModuleService.updateInventoryLevels({
                id: level.id,
                stocked_quantity: Math.max(0, level.stocked_quantity - lineItem.quantity),
              })
            }
          }
        }
      }

      console.log(`Updated inventory for order: ${order.id}`)
    } catch (error) {
      console.error("Failed to update inventory for order:", error)
    }
  })

  // Listen for order cancellation to restore inventory
  eventBusService.subscribe("order.cancelled", async (data) => {
    try {
      const { order } = data.payload
      
      // Restore inventory levels for each line item
      for (const lineItem of order.items) {
        if (lineItem.variant?.sku) {
          // Find the inventory item
          const inventoryItems = await inventoryModuleService.listInventoryItems({
            sku: lineItem.variant.sku,
          })

          if (inventoryItems.length > 0) {
            const inventoryItem = inventoryItems[0]
            
            // Find inventory levels for this item
            const inventoryLevels = await inventoryModuleService.listInventoryLevels({
              inventory_item_id: inventoryItem.id,
            })

            // Restore stock levels
            for (const level of inventoryLevels) {
              await inventoryModuleService.updateInventoryLevels({
                id: level.id,
                stocked_quantity: level.stocked_quantity + lineItem.quantity,
              })
            }
          }
        }
      }

      console.log(`Restored inventory for cancelled order: ${order.id}`)
    } catch (error) {
      console.error("Failed to restore inventory for cancelled order:", error)
    }
  })
} 