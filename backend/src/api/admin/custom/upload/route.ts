import { 
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/framework"
import { 
  IFileModuleService 
} from "@medusajs/framework/types"
import { 
  Modules 
} from "@medusajs/framework/utils"

interface UploadRequest {
  filename: string;
  content: string | Buffer;
  mimeType: string;
}

// POST - Upload image file (expects base64 or buffer data)
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const body = req.body as UploadRequest
    const { filename, content, mimeType } = body

    if (!filename || !content || !mimeType) {
      res.status(400).json({
        message: "Missing required fields: filename, content, mimeType"
      })
      return
    }

    // Validate it's an image
    if (!mimeType.startsWith('image/')) {
      res.status(400).json({
        message: "Only image files are allowed"
      })
      return
    }

    const fileModuleService: IFileModuleService = req.scope.resolve(
      Modules.FILE
    )

    // Convert base64 to buffer if needed
    let fileContent: string
    if (typeof content === 'string' && content.startsWith('data:')) {
      // Handle base64 data URL - extract base64 part
      fileContent = content.split(',')[1]
    } else if (typeof content === 'string') {
      // Handle plain base64
      fileContent = content
    } else {
      // Convert buffer to base64 string
      fileContent = Buffer.from(content).toString('base64')
    }

    const uploadedFile = await fileModuleService.createFiles({
      filename,
      mimeType,
      content: fileContent
    })

    res.json({
      message: "File uploaded successfully",
      file: {
        id: uploadedFile.id,
        url: uploadedFile.url,
        filename: filename
      }
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to upload file",
      error: error.message
    })
  }
} 