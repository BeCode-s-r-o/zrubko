import { 
  createWorkflow, 
  WorkflowResponse,
  createStep, 
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"

// Step to create an inventory item
const createInventoryItemStep = createStep(
  "create-inventory-item",
  async (input: {
    sku: string
    title: string
    requires_shipping?: boolean
    hs_code?: string
    origin_country?: string
    mid_code?: string
    material?: string
    weight?: number
    length?: number
    height?: number
    width?: number
  }, { container }) => {
    const inventoryModuleService = container.resolve(Modules.INVENTORY)

    const inventoryItem = await inventoryModuleService.createInventoryItems({
      sku: input.sku,
      title: input.title,
      requires_shipping: input.requires_shipping ?? true,
      hs_code: input.hs_code,
      origin_country: input.origin_country,
      mid_code: input.mid_code,
      material: input.material,
      weight: input.weight,
      length: input.length,
      height: input.height,
      width: input.width,
    })

    return new StepResponse({ inventoryItem }, inventoryItem.id)
  },
  async (inventoryItemId, { container }) => {
    if (!inventoryItemId) {
      return
    }
    const inventoryModuleService = container.resolve(Modules.INVENTORY)
    await inventoryModuleService.deleteInventoryItems([inventoryItemId])
  }
)

// Step to create inventory levels at locations
const createInventoryLevelStep = createStep(
  "create-inventory-level",
  async (input: {
    inventory_item_id: string
    location_id: string
    stocked_quantity: number
    incoming_quantity?: number
  }, { container }) => {
    const inventoryModuleService = container.resolve(Modules.INVENTORY)

    const inventoryLevel = await inventoryModuleService.createInventoryLevels({
      inventory_item_id: input.inventory_item_id,
      location_id: input.location_id,
      stocked_quantity: input.stocked_quantity,
      incoming_quantity: input.incoming_quantity ?? 0,
    })

    return new StepResponse({ inventoryLevel }, inventoryLevel.id)
  },
  async (inventoryLevelId, { container }) => {
    if (!inventoryLevelId) {
      return
    }
    const inventoryModuleService = container.resolve(Modules.INVENTORY)
    await inventoryModuleService.deleteInventoryLevels([inventoryLevelId])
  }
)

// Workflow to create inventory item with levels
export const createInventoryItemWithLevelsWorkflow = createWorkflow(
  "create-inventory-item-with-levels",
  (input: {
    sku: string
    title: string
    requires_shipping?: boolean
    location_id: string
    stocked_quantity: number
    incoming_quantity?: number
  }) => {
    const { inventoryItem } = createInventoryItemStep({
      sku: input.sku,
      title: input.title,
      requires_shipping: input.requires_shipping,
    })

    const { inventoryLevel } = createInventoryLevelStep({
      inventory_item_id: inventoryItem.id,
      location_id: input.location_id,
      stocked_quantity: input.stocked_quantity,
      incoming_quantity: input.incoming_quantity,
    })

    return new WorkflowResponse({
      inventoryItem,
      inventoryLevel,
    })
  }
)

// Workflow to create inventory item
export const createInventoryItemWorkflow = createWorkflow(
  "create-inventory-item-workflow",
  (input: {
    sku: string
    title: string
    requires_shipping?: boolean
    hs_code?: string
    origin_country?: string
    mid_code?: string
    material?: string
    weight?: number
    length?: number
    height?: number
    width?: number
  }) => {
    const { inventoryItem } = createInventoryItemStep(input)

    return new WorkflowResponse({
      inventoryItem,
    })
  }
) 