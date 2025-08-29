import { InjectManager, MedusaContext, MedusaService } from "@medusajs/framework/utils"
import { BlogPost } from "./models/blog-post"
import { Context } from "@medusajs/framework/types"
import { EntityManager } from "@mikro-orm/knex"

export interface BlogPostFilters {
  q?: string
  author?: string
  status?: "draft" | "published"
  language?: string
  tags?: string
}

export default class BlogModuleService extends MedusaService({
  BlogPost
}) {
  @InjectManager()
  async searchBlogPosts(
    filters: BlogPostFilters = {},
    config: { skip?: number; take?: number } = {},
    @MedusaContext() context: Context<EntityManager> = {}
  ) {
    const blogPostRepo = context.manager?.getRepository(BlogPost)

    let qb = blogPostRepo?.createQueryBuilder("bp")

    // Text search
    if (filters.q) {
      qb = qb?.where({
        $or: [
          { title: { $ilike: `%${filters.q}%` } },
          { content: { $ilike: `%${filters.q}%` } },
          { excerpt: { $ilike: `%${filters.q}%` } }
        ]
      })
    }

    // Author filter
    if (filters.author) {
      qb = qb?.andWhere({ author: filters.author })
    }

    // Status filter
    if (filters.status) {
      qb = qb?.andWhere({ status: filters.status })
    }

    // Language filter
    if (filters.language) {
      qb = qb?.andWhere({ language: filters.language })
    }

    // Tags filter (search in JSON array)
    if (filters.tags) {
      console.log("Service - filtering by tags:", filters.tags)
      const tagList = filters.tags.split(',').map(tag => tag.trim())
      console.log("Service - tagList:", tagList)

      // Use PostgreSQL JSONB @> operator with proper escaping
      const escapedTag = tagList[0].replace(/'/g, "''") // Escape single quotes
      const sqlQuery = `tags @> '["${escapedTag}"]'::jsonb`
      console.log("Service - SQL query:", sqlQuery)

      qb = qb?.andWhere(sqlQuery)

      // For multiple tags, we need to check if any of them exist
      for (let i = 1; i < tagList.length; i++) {
        const escapedTagMulti = tagList[i].replace(/'/g, "''")
        const sqlQueryMulti = `tags @> '["${escapedTagMulti}"]'::jsonb`
        console.log("Service - SQL query multi:", sqlQueryMulti)
        qb = qb?.orWhere(sqlQueryMulti)
      }
    }

    // Get total count
    const count = await qb?.clone().getCount() || 0

    // Apply pagination and ordering
    qb = qb?.orderBy({ created_at: "DESC" })

    if (config.skip) {
      qb = qb?.offset(config.skip)
    }

    if (config.take) {
      qb = qb?.limit(config.take)
    }

    const posts = await qb?.getResult() || []

    return { posts, count }
  }

  @InjectManager()
  async getPublishedPosts(
    config: { skip?: number; take?: number } = {},
    @MedusaContext() context: Context<EntityManager> = {}
  ) {
    return this.searchBlogPosts(
      { status: "published" },
      config,
      context
    )
  }

  @InjectManager()
  async findBySlug(
    slug: string,
    @MedusaContext() context: Context<EntityManager> = {}
  ) {
    const posts = await this.listBlogPosts({ slug }, {}, context)
    return posts.length > 0 ? posts[0] : null
  }

  @InjectManager()
  async retrieveBlogPostSafe(
    id: string,
    @MedusaContext() context: Context<EntityManager> = {}
  ) {
    try {
      const post = await this.retrieveBlogPost(id, context as any)
      return post
    } catch (error) {
      throw error
    }
  }

  @InjectManager()
  async publishPost(
    id: string,
    @MedusaContext() context: Context<EntityManager> = {}
  ) {
    return this.updateBlogPosts([{
      selector: { id },
      data: { published_at: new Date() }
    }], context)
  }

  @InjectManager()
  async unpublishPost(
    id: string,
    @MedusaContext() context: Context<EntityManager> = {}
  ) {
    return this.updateBlogPosts([{
      selector: { id },
      data: { published_at: null }
    }], context)
  }
}
