import { MedusaRequest, MedusaResponse } from "@medusajs/framework";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'medusa-backend',
    version: process.env.npm_package_version || 'unknown'
  });
}
