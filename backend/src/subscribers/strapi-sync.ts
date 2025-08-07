import type { SubscriberConfig } from "@medusajs/medusa"
import { Modules } from "@medusajs/framework/utils"

const strapiSyncSubscriber = async ({
  event: { name, data },
  container,
}: any) => {
  const logger = container.resolve("logger")
  
  // Only sync if Strapi configuration is available
  const strapiUrl = process.env.STRAPI_URL
  const strapiUsername = process.env.STRAPI_USERNAME
  const strapiPassword = process.env.STRAPI_PASSWORD
  
  if (!strapiUrl || !strapiUsername || !strapiPassword) {
    logger.warn("Strapi configuration not found, skipping sync")
    return
  }

  try {
    switch (name) {
      case "product.created":
      case "product.updated":
        await syncProductToStrapi(data, logger)
        break
      case "product-variant.created":
      case "product-variant.updated":
        await syncProductVariantToStrapi(data, logger)
        break
      case "region.created":
      case "region.updated":
        await syncRegionToStrapi(data, logger)
        break
      default:
        // Ignore other events
        break
    }
  } catch (error) {
    logger.error(`Failed to sync ${name} to Strapi:`, error)
  }
}

async function syncProductToStrapi(productData: any, logger: any) {
  const axios = require('axios')
  
  try {
    // Trigger Strapi sync endpoint
    await axios.post(`${process.env.STRAPI_URL}/api/medusa-sync/products`, {}, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    logger.info(`Successfully triggered Strapi product sync for product: ${productData.id}`)
  } catch (error) {
    logger.error(`Failed to trigger Strapi product sync:`, error.message)
  }
}

async function syncProductVariantToStrapi(variantData: any, logger: any) {
  const axios = require('axios')
  
  try {
    // Trigger Strapi sync endpoint for products (which includes variants)
    await axios.post(`${process.env.STRAPI_URL}/api/medusa-sync/products`, {}, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    logger.info(`Successfully triggered Strapi variant sync for variant: ${variantData.id}`)
  } catch (error) {
    logger.error(`Failed to trigger Strapi variant sync:`, error.message)
  }
}

async function syncRegionToStrapi(regionData: any, logger: any) {
  const axios = require('axios')
  
  try {
    // Trigger Strapi sync endpoint
    await axios.post(`${process.env.STRAPI_URL}/api/medusa-sync/regions`, {}, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    logger.info(`Successfully triggered Strapi region sync for region: ${regionData.id}`)
  } catch (error) {
    logger.error(`Failed to trigger Strapi region sync:`, error.message)
  }
}

export const config: SubscriberConfig = {
  event: [
    "product.created",
    "product.updated",
    "product-variant.created", 
    "product-variant.updated",
    "region.created",
    "region.updated"
  ],
}

export default strapiSyncSubscriber
