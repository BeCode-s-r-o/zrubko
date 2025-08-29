import { useState, useEffect, useRef } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import {
  Button,
  Input,
  Textarea,
  toast,
  Label,
  Select
} from "@medusajs/ui"
import { Plus, X } from "@medusajs/icons"

import { SUPPORTED_LANGUAGES } from "../../../../modules/blog/types"

interface BlogPostFormData {
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  cover_image: string
  tags: { value: string }[]
  language: string
  status: "draft" | "published"
}

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  author: string
  cover_image?: string
  tags?: string[]
  language: string
  status: "draft" | "published"
  published_at?: string
  created_at: string
  updated_at: string
}

interface BlogPostFormProps {
  blogPostId?: string
}

export const BlogPostForm = ({ blogPostId }: BlogPostFormProps) => {
  const queryClient = useQueryClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contentError, setContentError] = useState<string>("")
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null)
  const excerptTextareaRef = useRef<HTMLTextAreaElement>(null)


  // Check if we're in edit mode

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    getValues,
    formState: { errors }
  } = useForm<BlogPostFormData>({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      author: "",
      cover_image: "",
      language: "sk",
      status: "draft",
      tags: []
    }
  })

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
    control,
    name: "tags"
  })



  // Helper functions for text formatting with selection support
  const wrapSelection = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = contentTextareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    let selectedText = textarea.value.substring(start, end)
    const beforeText = textarea.value.substring(0, start)
    const afterText = textarea.value.substring(end)

    // Check if selected text already has this formatting
    if (selectedText.startsWith(before) && selectedText.endsWith(after)) {
      // Remove existing formatting
      selectedText = selectedText.slice(before.length, selectedText.length - after.length)
    }

    let replacement = selectedText || placeholder
    const newText = beforeText + before + replacement + after + afterText

    // Set value in form state
    setValue("content", newText, { shouldDirty: true })

    // Also set textarea value directly for immediate visual feedback
    textarea.value = newText

    // Clear any validation errors
    setContentError("")

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + (selectedText ? selectedText.length : placeholder.length)
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  // Smart heading formatting that handles existing headings
  const addHeading = (level: number) => {
    const textarea = contentTextareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    const beforeText = textarea.value.substring(0, start)
    const afterText = textarea.value.substring(end)

    const targetPrefix = '#'.repeat(level) + ' '
    let processedText = selectedText || 'Nadpis'
    let finalPrefix = targetPrefix

    // Check if there's already a heading at the beginning of the line
    const lines = beforeText.split('\n')
    const currentLine = lines[lines.length - 1]

    // If current line starts with #, remove existing heading
    const headingMatch = currentLine.match(/^(#{1,6})\s/)
    if (headingMatch && selectedText === currentLine.substring(headingMatch[0].length)) {
      // Remove existing heading from current line
      lines[lines.length - 1] = currentLine.substring(headingMatch[0].length)
      processedText = lines[lines.length - 1] + selectedText
      finalPrefix = targetPrefix
    } else if (selectedText.match(/^(#{1,6})\s.*$/)) {
      // Selected text already has a heading, replace it
      processedText = selectedText.replace(/^(#{1,6})\s/, targetPrefix)
      finalPrefix = ''
    }

    const newText = beforeText + finalPrefix + processedText + afterText

    setValue("content", newText, { shouldDirty: true })
    textarea.value = newText
    setContentError("")

    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + finalPrefix.length + processedText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  // Excerpt formatting functions
  const wrapExcerptSelection = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = excerptTextareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    let selectedText = textarea.value.substring(start, end)
    const beforeText = textarea.value.substring(0, start)
    const afterText = textarea.value.substring(end)

    // Check if selected text already has this formatting
    if (selectedText.startsWith(before) && selectedText.endsWith(after)) {
      // Remove existing formatting
      selectedText = selectedText.slice(before.length, selectedText.length - after.length)
    }

    let replacement = selectedText || placeholder
    const newText = beforeText + before + replacement + after + afterText

    // Set value in form state
    setValue("excerpt", newText, { shouldDirty: true })

    // Also set textarea value directly for immediate visual feedback
    textarea.value = newText

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + (selectedText ? selectedText.length : placeholder.length)
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const addExcerptBold = () => {
    wrapExcerptSelection('**', '**', 'tučný text')
  }

  const addExcerptItalic = () => {
    wrapExcerptSelection('*', '*', 'kurzívový text')
  }

  const addExcerptLink = () => {
    wrapExcerptSelection('[', '](https://example.com)', 'text odkazu')
  }

  const addExcerptLineBreak = () => {
    const textarea = excerptTextareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const beforeText = textarea.value.substring(0, start)
    const afterText = textarea.value.substring(end)

    const newText = beforeText + '<br>\n' + afterText
    setValue("excerpt", newText, { shouldDirty: true })
    textarea.value = newText

    // Restore cursor position after the inserted line break
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + 5 // '<br>\n'.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }




  const addBold = () => {
    wrapSelection('**', '**', 'tučný text')
  }

  const addItalic = () => {
    wrapSelection('*', '*', 'kurzívový text')
  }

  const addLink = () => {
    wrapSelection('[', '](url)', 'text odkazu')
  }

  const addBulletList = () => {
    const textarea = contentTextareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    const beforeText = textarea.value.substring(0, start)
    const afterText = textarea.value.substring(end)

    // If text is selected, create list item with selected text
    if (selectedText.trim()) {
      const listItem = `- ${selectedText}`
      const newText = beforeText + listItem + afterText
      setValue("content", newText, { shouldDirty: true })
      textarea.value = newText

      setTimeout(() => {
        textarea.focus()
        const newCursorPos = start + listItem.length
        textarea.setSelectionRange(newCursorPos, newCursorPos)
      }, 0)
    } else {
      // If no text is selected, add default list
      const currentValue = getValues("content") || ""
      const listText = '\n- Prvá položka\n- Druhá položka\n- Tretia položka\n\n'
      const newValue = currentValue ? currentValue + listText : listText.trimStart()
      setValue("content", newValue, { shouldDirty: true })
      textarea.value = newValue
    }
  }

  const addLineBreak = () => {
    const textarea = contentTextareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const beforeText = textarea.value.substring(0, start)
    const afterText = textarea.value.substring(end)

    const newText = beforeText + '<br>\n' + afterText
    setValue("content", newText, { shouldDirty: true })
    textarea.value = newText

    // Restore cursor position after the inserted line break
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + 5 // '<br>\n'.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }




  // Fetch existing post for editing
  const { data: existingPost, isLoading, refetch } = useQuery<BlogPost>({
    queryKey: ["blog-post", blogPostId],
    queryFn: async () => {
      console.log("Fetching blog post for editing, ID:", blogPostId)
      const response = await fetch(`/admin/blog/posts/${blogPostId}`, {
        credentials: "include", // Important for session-based auth
        headers: {
          'Cache-Control': 'no-cache' // Force fresh data
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Fetched blog post data:", data)
      return data
    },
    enabled: !!blogPostId,
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache the data (renamed from cacheTime in newer versions)
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true // Always refetch on mount
  })

  // Force refetch when component mounts if we have a blogPostId
  useEffect(() => {
    if (blogPostId) {
      console.log("Blog post form mounted with ID:", blogPostId, "- forcing refetch")
      refetch()
    }
  }, [blogPostId, refetch])

  // Auto-generate slug from title
  const title = watch("title")

  useEffect(() => {
    if (title && !blogPostId) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setValue("slug", slug)
    }
  }, [title, setValue, blogPostId])

  // Populate form with existing data
  useEffect(() => {
    if (existingPost && blogPostId) {
      console.log("Populating form with existing post data:", existingPost)

      // Type assertion to ensure TypeScript knows the shape
      const post = existingPost as BlogPost

      // Small delay to ensure form is ready
      setTimeout(() => {
        setValue("title", post.title || "")
        setValue("slug", post.slug || "")
        setValue("content", post.content || "", { shouldDirty: true })
        setValue("excerpt", post.excerpt || "", { shouldDirty: true })
        setValue("author", post.author || "")
        setValue("cover_image", post.cover_image || "")
        setValue("language", post.language || "sk")
        setValue("status", post.status || "draft")

        // Also set textarea value directly to ensure it updates
        if (contentTextareaRef.current) {
          contentTextareaRef.current.value = post.content || ""
        }

        // Set tags - handle MikroORM JSON format
        if (post.tags) {
          console.log("Setting tags:", post.tags)
          // MikroORM returns tags as { data: [...] } object, extract the actual array
          const tagsArray = Array.isArray(post.tags)
            ? post.tags
            : (post.tags as any)?.data || []
          console.log("Processed tags array:", tagsArray)
          setValue("tags", tagsArray.map((tag: string) => ({ value: tag })))
        } else {
          setValue("tags", [])
        }

        console.log("Form populated successfully")
      }, 100)
    }
  }, [existingPost, blogPostId, setValue])

  // Removed old mutation hooks - now handled directly in onSubmit

  const onSubmit = async (data: BlogPostFormData) => {
    // Manual validation for content
    if (!data.content || data.content.trim() === "") {
      setContentError("Content is required")
      return
    }
    setContentError("")

    setIsSubmitting(true)
    try {
      console.log("Form submit - data:", data)
      console.log("Form submit - status:", data.status)

      if (blogPostId) {

        // Prepare update payload - published_at is set based on status
        const publishedAt = data.status === "published" ? new Date().toISOString() : null

        console.log("Update - publishedAt:", publishedAt)

        const updatePayload = {
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt: data.excerpt,
          author: data.author,
          cover_image: data.cover_image || null,
          tags: data.tags.map(tag => tag.value).filter(Boolean),
          language: data.language,
          status: data.status,
          published_at: publishedAt
        }

        console.log("Update payload:", updatePayload)

        // Prepare the update request

        if (!blogPostId || blogPostId.trim() === "") {
          throw new Error("Blog post ID is empty or undefined")
        }

        const response = await fetch(`/admin/blog/posts/${blogPostId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatePayload)
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("Update failed:", response.status, errorText)
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }

        const updatedPost = await response.json()
        console.log("Blog post updated successfully:", updatedPost)

        // Force immediate invalidation and refetch
        queryClient.invalidateQueries({ queryKey: ["blog-posts"] })
        queryClient.invalidateQueries({ queryKey: ["blog-post", blogPostId] })

        // Also invalidate specific blog post queries that might be cached
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'blog-post'
        })

        // Trigger storefront refresh via postMessage
        if (typeof window !== 'undefined' && window.parent) {
          try {
            console.log("Sending BLOG_UPDATED message to storefront")
            // Send message to storefront to refresh blog data
            window.parent.postMessage({
              type: 'BLOG_UPDATED',
              data: {
                id: updatedPost.id,
                slug: updatedPost.slug,
                countryCode: updatedPost.language || 'sk'
              }
            }, '*')
          } catch (error) {
            console.warn('Could not send refresh message to storefront:', error)
          }
        }

        toast.success("Blog post updated successfully")
        window.location.href = "/app/blog"

      } else {

        console.log("Create - data:", data)
        console.log("Create - status:", data.status)

        const publishedAt = data.status === "published" ? new Date().toISOString() : null

        console.log("Create - publishedAt:", publishedAt)

        const payload = {
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt: data.excerpt,
          author: data.author,
          cover_image: data.cover_image || null,
          tags: data.tags.map(tag => tag.value).filter(Boolean),
          language: data.language,
          status: data.status,
          published_at: publishedAt
        }

        console.log("Create payload:", payload)

        const response = await fetch("/admin/blog/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("Create failed:", response.status, errorText)
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }

        await response.json() // result not needed

        queryClient.invalidateQueries({ queryKey: ["blog-posts"] })
        toast.success("Blog post created successfully")
        window.location.href = "/app/blog"
      }
    } catch (error: any) {
      console.error("Form submission error:", error)
      toast.error(`Failed to save blog post: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

    if (blogPostId && isLoading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            {...register("title", { required: "Title is required" })}
            placeholder="Enter blog post title"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            {...register("slug", {
              required: "Slug is required",
              pattern: {
                value: /^[a-z0-9-]+$/,
                message: "Slug can only contain lowercase letters, numbers, and hyphens"
              }
            })}
            placeholder="url-friendly-slug"
          />
          {errors.slug && (
            <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="author">Author *</Label>
          <Input
            id="author"
            {...register("author", { required: "Author is required" })}
            placeholder="Author name"
          />
          {errors.author && (
            <p className="text-red-600 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="language">Language</Label>
          <Select
            value={watch("language")}
            onValueChange={(value) => setValue("language", value)}
          >
            <Select.Trigger>
              <Select.Value placeholder="Select language" />
            </Select.Trigger>
            <Select.Content>
              {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
                <Select.Item key={code} value={code}>
                  {name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="cover_image">Cover Image URL</Label>
        <Input
          id="cover_image"
          {...register("cover_image")}
          placeholder="https://example.com/image.jpg"
          type="url"
        />
        {errors.cover_image && (
          <p className="text-red-600 text-sm mt-1">{errors.cover_image.message}</p>
        )}
      </div>

      <div>
        <Label>Tags</Label>
        <div className="space-y-2">
          {tagFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <Input
                {...register(`tags.${index}.value` as const)}
                placeholder="Enter tag"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => removeTag(index)}
                className="px-3"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() => appendTag({ value: "" })}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Tag
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt</Label>

        {/* Simple excerpt formatting toolbar */}
        <div className="flex gap-2 p-2 bg-gray-600 rounded-t-md border">
          <Button
            type="button"
            variant="secondary"
            size="small"
            onClick={addExcerptBold}
            className="px-2 py-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold"
            title="Tučné písmo (označte text a kliknite)"
          >
            B
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="small"
            onClick={addExcerptItalic}
            className="px-2 py-1 bg-pink-600 hover:bg-pink-700 text-white italic"
            title="Kurzíva (označte text a kliknite)"
          >
            I
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="small"
            onClick={addExcerptLink}
            className="px-2 py-1 bg-cyan-600 hover:bg-cyan-700 text-white"
            title="Odkaz (označte text a kliknite)"
          >
            🔗
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="small"
            onClick={addExcerptLineBreak}
            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white"
            title="Nový riadok (line break)"
          >
            ⏎
          </Button>
        </div>

        <Textarea
          id="excerpt"
          value={watch("excerpt") || ""}
          onChange={(e) => setValue("excerpt", e.target.value, { shouldDirty: true })}
          placeholder="Stručný popis článku (voliteľné)"
          rows={3}
          className="rounded-t-none"
          ref={excerptTextareaRef}
        />
        <div className="text-gray-500 text-sm mt-1 space-y-1">
          <p>Podporuje rovnaké formátovanie ako pole obsahu</p>
          <p>Ak nie je poskytnuté, bude automaticky vygenerované z obsahu</p>
        </div>
      </div>

      <div>
        <Label htmlFor="content">Content *</Label>

        {/* Formatting toolbar */}
        <div className="flex flex-wrap gap-2 p-3 bg-gray-600 rounded-t-md border">
          {/* Headings */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-white mr-2">Nadpisy:</span>
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={() => addHeading(1)}
              className="px-3 py-1 text-xs font-bold  text-white"
              title="Hlavný nadpis (označte text a kliknite)"
            >
              H¹
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={() => addHeading(2)}
              className="px-3 py-1 text-xs font-bold   text-white"
              title="Sekcia nadpis (označte text a kliknite)"
            >
              H²
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={() => addHeading(3)}
              className="px-3 py-1 text-xs font-bold  "
              title="Podsekcia nadpis (označte text a kliknite)"
            >
              H³
            </Button>
          </div>

          {/* Text formatting */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-white mr-2">Text:</span>
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={addBold}
              className="px-3 py-1 font-bold bg-yellow-600 hover:bg-yellow-700 text-white"
              title="Tučné písmo (označte text a kliknite)"
            >
              B
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={addItalic}
              className="px-3 py-1 italic bg-pink-600 hover:bg-pink-700 text-white"
              title="Kurzíva (označte text a kliknite)"
            >
              I
            </Button>
          </div>

          {/* Links and Lists */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-white mr-2">Prvky:</span>
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={addLink}
              className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white"
              title="Odkaz (označte text a kliknite)"
            >
              🔗
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={addBulletList}
              className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white"
              title="Odrážkový zoznam (označte text a kliknite)"
            >
              •••
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={addLineBreak}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white"
              title="Nový riadok (line break)"
            >
              ⏎
            </Button>
          </div>
        </div>

        <Textarea
          id="content"
          value={watch("content") || ""}
          onChange={(e) => {
            setValue("content", e.target.value, { shouldDirty: true })
            if (contentError) setContentError("")
          }}
          placeholder="Začni písať svoj blog alebo klikni na tlačidlá vyššie pre rýchle formátovanie..."
          rows={15}
          className="rounded-t-none"
          ref={contentTextareaRef}
        />
        {contentError && (
          <p className="text-red-600 text-sm mt-1">{contentError}</p>
        )}

        {/* Quick reference */}
        <div className="text-gray-500 text-sm mt-2 p-3 bg-blue-50 rounded-md">
          <p className="font-medium text-xs mb-2 text-blue-800">🚀 Ako používať editor:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <p className="font-medium mb-1 text-blue-700">Nadpisy:</p>
              <p>Označte text a kliknite na H¹/H²/H³</p>
            </div>
            <div>
              <p className="font-medium mb-1 text-blue-700">Formátovanie:</p>
              <p>Označte text a kliknite na B (tučné) alebo I (kurzíva)</p>
            </div>
            <div>
              <p className="font-medium mb-1 text-blue-700">Odkazy:</p>
              <p>Označte text a kliknite na 🔗</p>
            </div>
            <div>
              <p className="font-medium mb-1 text-blue-700">Zoznamy:</p>
              <p>Použite ••• pre odrážkový zoznam</p>
            </div>
          </div>
          <p className="text-xs mt-2 text-gray-600">
            💡 Tip: Môžete písať priamo markdown syntax alebo používať tlačidlá pre vizuálne formátovanie!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <Select.Trigger>
                  <Select.Value placeholder="Select status" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="draft">Draft</Select.Item>
                  <Select.Item value="published">Published</Select.Item>
                </Select.Content>
              </Select>
            )}
          />
        </div>

      </div>

      <div className="flex items-center gap-3 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? (blogPostId ? "Updating..." : "Creating...")
            : (blogPostId ? "Update Post" : "Create Post")
          }
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.location.href = "/app/blog"}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
