import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Button,
  Table,
  Badge,
  Input,
  Select,
  toast,
  DropdownMenu,
  IconButton
} from "@medusajs/ui"
import { PencilSquare, Trash, EllipsisHorizontal, Plus } from "@medusajs/icons"


interface BlogPost {
  id: string
  title: string
  slug: string
  author: string
  language: string
  status: "draft" | "published"
  published_at?: string
  created_at: string
}

interface BlogPostListResponse {
  posts: BlogPost[]
  count: number
  limit: number
  offset: number
}

export const BlogPostList = () => {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState("")
  const [authorFilter, setAuthorFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [languageFilter, setLanguageFilter] = useState("")
  const [tagFilter, setTagFilter] = useState("")
  const [offset, setOffset] = useState(0)
  const limit = 20

  const { data, isLoading, error } = useQuery<BlogPostListResponse>({
    queryKey: ["blog-posts", searchQuery, authorFilter, statusFilter, languageFilter, tagFilter, offset],
    queryFn: async () => {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })

      if (searchQuery) params.append("q", searchQuery)
      if (authorFilter) params.append("author", authorFilter)
      if (statusFilter && statusFilter !== "all") params.append("status", statusFilter)
      if (languageFilter && languageFilter !== "all") params.append("language", languageFilter)
      if (tagFilter) params.append("tags", tagFilter)

      console.log("Blog list - filters:", {
        searchQuery,
        authorFilter,
        statusFilter,
        languageFilter,
        tagFilter
      })
      console.log("Blog list - params:", params.toString())

      const response = await fetch(`/admin/blog/posts?${params}`, {
        credentials: "include" // Important for session-based auth
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json()
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/admin/blog/posts/${id}`, {
        method: "DELETE",
        credentials: "include" // Important for session-based auth
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.status === 204 ? null : response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] })
      toast.success("Blog post deleted successfully")
    },
    onError: (error: any) => {
      toast.error(`Failed to delete blog post: ${error.message}`)
    }
  })

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deleteMutation.mutate(id)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusBadge = (status: "draft" | "published") => {
    if (status === "published") {
      return <Badge color="green">Published</Badge>
    }
    return <Badge color="grey">Draft</Badge>
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-red-600">Error loading blog posts: {(error as Error).message}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Input
            placeholder="Filter by author..."
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="w-48"
          />
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <Select.Trigger className="w-32">
              <Select.Value placeholder="Status" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="all">All</Select.Item>
              <Select.Item value="published">Published</Select.Item>
              <Select.Item value="draft">Draft</Select.Item>
            </Select.Content>
          </Select>
          <Select
            value={languageFilter}
            onValueChange={setLanguageFilter}
          >
            <Select.Trigger className="w-32">
              <Select.Value placeholder="Language" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="all">All</Select.Item>
              <Select.Item value="sk">Slovenčina</Select.Item>
              <Select.Item value="cz">Čeština</Select.Item>
              <Select.Item value="de">Deutsch</Select.Item>
              <Select.Item value="gb">English</Select.Item>
            </Select.Content>
          </Select>
          <Input
            placeholder="Filter by tag..."
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="w-32"
          />
        </div>
        <Button
          onClick={() => window.location.href = "/app/blog/create"}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Post
        </Button>
      </div>

      {/* Table */}
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>Language</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Created</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Row>
              <Table.Cell className="text-center py-8">
                <div className="col-span-6 text-center">Loading...</div>
              </Table.Cell>
            </Table.Row>
          ) : data?.posts.length === 0 ? (
            <Table.Row>
              <Table.Cell className="text-center py-8">
                <div className="col-span-6 text-center">No blog posts found</div>
              </Table.Cell>
            </Table.Row>
          ) : (
            data?.posts.map((post) => (
              <Table.Row key={post.id}>
                <Table.Cell>
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-gray-500">/{post.slug}</p>
                  </div>
                </Table.Cell>
                <Table.Cell>{post.author}</Table.Cell>
                <Table.Cell>
                  <Badge color="blue">
                    {post.language === 'sk' ? 'Slovenčina' :
                     post.language === 'cz' ? 'Čeština' :
                     post.language === 'de' ? 'Deutsch' :
                     post.language === 'gb' ? 'English' : post.language}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{getStatusBadge(post.status)}</Table.Cell>
                <Table.Cell>{formatDate(post.created_at)}</Table.Cell>
                <Table.Cell>
                  <DropdownMenu>
                    <DropdownMenu.Trigger asChild>
                      <IconButton>
                        <EllipsisHorizontal />
                      </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item
                        onClick={() => window.location.href = `/app/blog/${post.id}/edit`}
                        className="flex items-center gap-2"
                      >
                        <PencilSquare className="w-4 h-4" />
                        Edit
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onClick={() => handleDelete(post.id)}
                        className="flex items-center gap-2 text-red-600"
                      >
                        <Trash className="w-4 h-4" />
                        Delete
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>

      {/* Pagination */}
      {data && data.count > limit && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {offset + 1}-{Math.min(offset + limit, data.count)} of {data.count} posts
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => setOffset(Math.max(0, offset - limit))}
              disabled={offset === 0}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              onClick={() => setOffset(offset + limit)}
              disabled={offset + limit >= data.count}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
