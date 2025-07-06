import { 
  BeforeCreate,
  Column,
  Entity,
  Index,
  OneToMany
} from "typeorm"
import {
  generateEntityId,
} from "@medusajs/utils"
import { Post } from "./post"
import { SoftDeletableEntity } from "@medusajs/medusa"

@Entity()
export class Category extends SoftDeletableEntity {
  @Column()
  title: string

  @Column()
  @Index({ unique: true })
  handle: string

  @Column({ type: "text", nullable: true })
  description: string

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[]

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, unknown>

  @BeforeCreate()
  private beforeCreate(): void {
    this.id = generateEntityId(this.id, "bcat")
  }
} 