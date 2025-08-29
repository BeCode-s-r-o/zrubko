import { Migration } from '@mikro-orm/migrations'

export class Migration20241220000001 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
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
        "deleted_at" timestamptz,
        CONSTRAINT "blog_post_pkey" PRIMARY KEY ("id")
      );
    `)

    this.addSql(`
      CREATE UNIQUE INDEX "IDX_blog_post_slug" ON "blog_post" ("slug");
    `)

    this.addSql(`
      CREATE INDEX "IDX_blog_post_published_at" ON "blog_post" ("published_at");
    `)

    this.addSql(`
      CREATE INDEX "IDX_blog_post_author" ON "blog_post" ("author");
    `)
  }

  async down(): Promise<void> {
    this.addSql(`DROP TABLE IF EXISTS "blog_post" CASCADE;`)
  }
}
