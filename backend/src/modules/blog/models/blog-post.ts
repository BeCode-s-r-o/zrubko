import { model } from "@medusajs/framework/utils"

export const BlogPost = model.define("blog_post", {
  id: model.id().primaryKey(),
  title: model.text(),
  slug: model.text().unique(),
  content: model.text(),
  excerpt: model.text().nullable(),
  author: model.text(),
  cover_image: model.text().nullable(), // URL to cover image
  tags: model.json().nullable(), // Array of tags stored as JSON
  language: model.text().default("sk"), // Language code: sk, cz, de, gb
  status: model.enum(["draft", "published"]).default("draft"),
  published_at: model.dateTime().nullable(),
})
.indexes([
  {
    on: ["slug"],
    unique: true
  },
  {
    on: ["status"]
  },
  {
    on: ["published_at"]
  },
  {
    on: ["author"]
  },
  {
    on: ["language"]
  }
])
