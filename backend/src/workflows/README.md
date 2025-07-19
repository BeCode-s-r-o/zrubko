# Workflows

This directory contains workflow definitions for the Medusa backend.

## Inventory Management Workflows

### `inventory-management.ts`

This file contains workflows for managing inventory in your Medusa store:

#### Available Workflows:

1. **`createInventoryItemWorkflow`**
   - Creates a new inventory item
   - Parameters:
     - `sku`: Stock Keeping Unit
     - `title`: Item title
     - `requires_shipping`: Whether the item requires shipping
     - `hs_code`: Harmonized System code
     - `origin_country`: Country of origin
     - `mid_code`: Manufacturer ID code
     - `material`: Material description
     - `weight`, `length`, `height`, `width`: Physical dimensions

2. **`createInventoryItemWithLevelsWorkflow`**
   - Creates an inventory item with stock levels at a specific location
   - Parameters:
     - All parameters from `createInventoryItemWorkflow`
     - `location_id`: Location where stock is stored
     - `stocked_quantity`: Current stock quantity
     - `incoming_quantity`: Quantity expected to arrive

#### Usage Examples:

```typescript
// Create a simple inventory item
const result = await createInventoryItemWorkflow.run({
  input: {
    sku: "SHIRT-001",
    title: "Blue T-Shirt",
    requires_shipping: true,
    weight: 0.2,
  }
})

// Create inventory item with stock levels
const result = await createInventoryItemWithLevelsWorkflow.run({
  input: {
    sku: "SHIRT-001",
    title: "Blue T-Shirt",
    requires_shipping: true,
    location_id: "warehouse-1",
    stocked_quantity: 100,
    incoming_quantity: 50,
  }
})
```

## API Endpoints

### `/admin/inventory`

- **POST**: Create inventory items
  - Body: `{ "action": "create-item" | "create-item-with-levels", ...data }`
- **GET**: Query inventory data
  - Query params: `sku`, `location_id`

## Subscribers

### `inventory-updates.ts`

Automatically handles inventory updates when:
- New product variants are created
- Orders are placed (reduces stock)
- Orders are cancelled (restores stock)

## Configuration

The Inventory module is configured in `medusa-config.js`:

```javascript
{
  key: Modules.INVENTORY,
  resolve: '@medusajs/inventory',
  options: {
    // Optional configuration
  }
}
```

## Features

- ✅ Inventory Items Management
- ✅ Inventory Across Locations  
- ✅ Automatic Stock Updates
- ✅ Order Integration
- ✅ Workflow-based Operations
- ✅ Error Handling & Rollback
