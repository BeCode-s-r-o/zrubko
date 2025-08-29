# Blog Module for Medusa v2.9+

A complete blog feature implementation for Medusa v2.9+ with Admin UI, API routes, and workflows.

## Features

- ✅ **Blog Post Management**: CRUD operations with validation
- ✅ **Rich Admin UI**: List, create, edit, and delete blog posts
- ✅ **Search & Filtering**: Full-text search, author filtering, publish status
- ✅ **Workflow Integration**: Atomic operations with rollback support
- ✅ **Public API**: Storefront routes for published posts
- ✅ **Validation**: Zod schema validation for all inputs
- ✅ **Pagination**: Efficient pagination for large datasets

## Installation & Setup

### 1. Enable the Module

The blog module is already configured in `medusa-config.js`. If you need to add it manually:

```javascript
// medusa-config.js
modules: [
  {
    resolve: "./src/modules/blog",
    options: {
      blog: {
        enabled: true,
      }
    }
  },
  // ... other modules
]
```

### 2. Run Database Migration

```bash
# Navigate to backend directory
cd backend

# Create and run migration
npx medusa db:migrate

# Or if using custom migration path
npx medusa db:migrate --path ./src/modules/blog/migrations
```

### 3. Seed Sample Data (Optional)

```bash
# Run the blog seed script
npx medusa exec ./src/scripts/seed-blog.ts
```

### 4. Start Development Server

```bash
npm run dev
```

## API Documentation

### Admin API Routes

All admin routes require authentication. Include session cookies or JWT token in requests.

#### List Blog Posts
```bash
GET /admin/blog/posts?q=search&author=author&published=true&limit=20&offset=0
```

**Query Parameters:**
- `q` (optional): Search in title, content, and excerpt
- `author` (optional): Filter by author name
- `published` (optional): `true` for published, `false` for drafts
- `limit` (optional): Number of posts per page (default: 20, max: 100)
- `offset` (optional): Number of posts to skip (default: 0)

**Example:**
```bash
curl -X GET "http://localhost:9000/admin/blog/posts?q=welcome&published=true" \
  -H "Cookie: connect.sid=your-session-cookie"
```

#### Get Single Blog Post
```bash
GET /admin/blog/posts/:id
```

**Example:**
```bash
curl -X GET "http://localhost:9000/admin/blog/posts/post_123" \
  -H "Cookie: connect.sid=your-session-cookie"
```

#### Create Blog Post
```bash
POST /admin/blog/posts
```

**Body:**
```json
{
  "title": "My First Blog Post",
  "slug": "my-first-blog-post",
  "content": "This is the content of my blog post...",
  "excerpt": "Brief description (optional)",
  "author": "John Doe",
  "published_at": "2024-12-20T10:00:00Z" // or null for draft
}
```

**Example:**
```bash
curl -X POST "http://localhost:9000/admin/blog/posts" \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=your-session-cookie" \
  -d '{
    "title": "Welcome to Our Blog",
    "slug": "welcome-to-our-blog",
    "content": "# Welcome\n\nThis is our first blog post!",
    "author": "Admin Team",
    "published_at": "2024-12-20T10:00:00Z"
  }'
```

#### Update Blog Post
```bash
PATCH /admin/blog/posts/:id
```

**Body:** Same as create, but all fields are optional

**Example:**
```bash
curl -X PATCH "http://localhost:9000/admin/blog/posts/post_123" \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=your-session-cookie" \
  -d '{
    "title": "Updated Blog Post Title",
    "published_at": null
  }'
```

#### Delete Blog Post
```bash
DELETE /admin/blog/posts/:id
```

**Example:**
```bash
curl -X DELETE "http://localhost:9000/admin/blog/posts/post_123" \
  -H "Cookie: connect.sid=your-session-cookie"
```

### Storefront API Routes

Public routes that don't require authentication. Only returns published posts.

#### List Published Posts
```bash
GET /store/blog/posts?q=search&author=author&limit=20&offset=0
```

**Example:**
```bash
curl -X GET "http://localhost:9000/store/blog/posts?limit=10"
```

#### Get Published Post by Slug
```bash
GET /store/blog/posts/:slug
```

**Example:**
```bash
curl -X GET "http://localhost:9000/store/blog/posts/welcome-to-our-blog"
```

## Admin UI Usage

### Accessing the Blog Admin

1. Start your Medusa backend with `npm run dev`
2. Open the Admin dashboard (usually `http://localhost:9000/app`)
3. Log in with your admin credentials
4. Navigate to "Blog" in the sidebar

### Managing Blog Posts

1. **View Posts**: The main blog page shows all posts with search and filtering
2. **Create Post**: Click "Create Post" button to add a new blog post
3. **Edit Post**: Click the edit icon in the actions column
4. **Delete Post**: Click the delete icon (requires confirmation)
5. **Publish/Unpublish**: Toggle the publish switch when creating/editing

### Form Fields

- **Title**: Post title (required, max 200 chars)
- **Slug**: URL-friendly identifier (auto-generated from title, required, unique)
- **Author**: Author name (required, max 100 chars)
- **Excerpt**: Brief description (optional, max 500 chars, auto-generated if empty)
- **Content**: Full post content (required, supports Markdown)
- **Published**: Toggle to publish immediately or save as draft

## Workflows

The blog module includes two main workflows:

### Create Blog Post Workflow
```typescript
import { createBlogPostWorkflow } from "./workflows/create-blog-post"

const { result } = await createBlogPostWorkflow(container).run({
  input: {
    blogPostData: {
      title: "My Post",
      slug: "my-post",
      content: "Content here...",
      author: "Author Name",
      published_at: new Date().toISOString() // or null
    }
  }
})
```

### Update Blog Post Workflow
```typescript
import { updateBlogPostWorkflow } from "./workflows/update-blog-post"

const { result } = await updateBlogPostWorkflow(container).run({
  input: {
    id: "post_123",
    blogPostData: {
      title: "Updated Title"
    }
  }
})
```

Both workflows include automatic rollback on failure.

## Database Schema

The blog module creates a `blog_post` table with the following structure:

```sql
CREATE TABLE "blog_post" (
  "id" character varying NOT NULL,
  "title" text NOT NULL,
  "slug" text NOT NULL,
  "content" text NOT NULL,
  "excerpt" text,
  "author" text NOT NULL,
  "published_at" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "blog_post_pkey" PRIMARY KEY ("id")
);

-- Indexes
CREATE UNIQUE INDEX "IDX_blog_post_slug" ON "blog_post" ("slug");
CREATE INDEX "IDX_blog_post_published_at" ON "blog_post" ("published_at");
CREATE INDEX "IDX_blog_post_author" ON "blog_post" ("author");
```

## Validation Rules

### Create/Update Blog Post
- **title**: Required, 1-200 characters
- **slug**: Required, 1-100 characters, lowercase letters/numbers/hyphens only, unique
- **content**: Required, minimum 1 character
- **excerpt**: Optional, maximum 500 characters
- **author**: Required, 1-100 characters
- **published_at**: Optional, valid ISO datetime string or null

### Query Parameters
- **q**: Optional string for search
- **author**: Optional string for author filter
- **published**: Optional, must be "true" or "false"
- **limit**: Optional number, 1-100, default 20
- **offset**: Optional number, minimum 0, default 0

## Error Handling

### Common Error Responses

**400 Bad Request - Validation Error:**
```json
{
  "type": "invalid_data",
  "message": "Validation failed: Title is required"
}
```

**404 Not Found:**
```json
{
  "type": "not_found",
  "message": "Blog post with id post_123 not found"
}
```

**401 Unauthorized (Admin routes only):**
```json
{
  "type": "unauthorized",
  "message": "Authentication required"
}
```

**409 Conflict - Duplicate Slug:**
```json
{
  "type": "duplicate_error",
  "message": "Blog post with slug 'my-post' already exists"
}
```

## Troubleshooting

### Common Issues

**1. Migration fails**
```bash
# Check if the migration file exists
ls src/modules/blog/migrations/

# Run with verbose logging
npx medusa db:migrate --verbose
```

**2. Module not loading**
```bash
# Check medusa-config.js syntax
node -c medusa-config.js

# Restart the development server
npm run dev
```

**3. Admin UI not showing Blog section**
- Ensure you're logged in as an admin user
- Check browser console for JavaScript errors
- Verify the admin routes are in the correct directory structure

**4. API routes returning 404**
```bash
# Check if the backend is running
curl http://localhost:9000/health

# Verify route files exist
ls src/api/admin/blog/posts/
ls src/api/store/blog/posts/
```

**5. Validation errors on create/update**
- Check request body format matches the schema
- Ensure required fields are provided
- Verify slug format (lowercase, alphanumeric, hyphens only)

**6. Database connection issues**
```bash
# Check database connection
npx medusa db:check

# Reset and re-run migrations
npx medusa db:reset
npx medusa db:migrate
```

### Debug Mode

Enable debug logging in your `.env` file:
```bash
LOG_LEVEL=debug
NODE_ENV=development
```

This will provide detailed logs for troubleshooting API requests and database queries.

## Development

### File Structure
```
src/modules/blog/
├── index.ts                    # Module definition
├── service.ts                  # Blog service with business logic
├── models/
│   └── blog-post.ts           # BlogPost entity
├── types/
│   └── index.ts               # TypeScript types and Zod schemas
├── migrations/
│   └── Migration20241220000001.ts
└── README.md                   # This file

src/workflows/
├── create-blog-post.ts        # Create workflow
├── update-blog-post.ts        # Update workflow
└── steps/
    ├── create-blog-post.ts    # Create step
    └── update-blog-post.ts    # Update step

src/api/
├── admin/blog/posts/          # Admin CRUD routes
└── store/blog/posts/          # Public read routes

src/admin/routes/blog/         # Admin UI components
├── page.tsx                   # Main blog list page
├── create/page.tsx           # Create post page
├── [id]/edit/page.tsx        # Edit post page
└── components/
    ├── blog-post-list.tsx    # Post list component
    └── blog-post-form.tsx    # Create/edit form
```

### Extending the Module

To add new features:

1. **Add new fields**: Update the model, migration, and types
2. **Add new endpoints**: Create new route files following the pattern
3. **Add new workflows**: Create workflow files in the workflows directory
4. **Update UI**: Add new components or modify existing ones

### Testing

Run the test checklist after making changes:

1. ✅ Create a new blog post via Admin UI
2. ✅ Edit post title and content
3. ✅ Toggle publish status
4. ✅ Search and filter posts
5. ✅ Delete a post
6. ✅ Test API endpoints with curl
7. ✅ Verify storefront routes only show published posts
8. ✅ Test validation with invalid data
9. ✅ Check pagination with many posts
10. ✅ Verify unique slug constraint

For automated testing, see the test files in the testing section.
