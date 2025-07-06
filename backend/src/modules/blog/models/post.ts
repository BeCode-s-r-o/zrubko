import { 
  BeforeCreate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm"
import {
  generateEntityId,
} from "@medusajs/utils"
import { BaseEntity } from "@medusajs/medusa"
import { Category } from "./category"
import { Tag } from "./tag"

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string

  @Column()
  @Index({ unique: true })
  handle: string

  @Column({ type: "text" })
  content: string

  @Column({ nullable: true })
  author: string

  @Column({ type: "text", nullable: true })
  excerpt: string

  @Column({ type: "text", nullable: true })
  featured_image: string

  @Column({ default: false })
  published: boolean

  @Column({ type: "timestamp", nullable: true })
  published_at: Date

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: "category_id" })
  category: Category

  @Column({ nullable: true })
  category_id: string

  @ManyToMany(() => Tag)
  @JoinTable({
    name: "post_tags",
    joinColumn: {
      name: "post_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tag_id",
      referencedColumnName: "id",
    },
  })
  tags: Tag[]

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, unknown>

  @BeforeCreate()
  private beforeCreate(): void {
    this.id = generateEntityId(this.id, "post")
  }
} 