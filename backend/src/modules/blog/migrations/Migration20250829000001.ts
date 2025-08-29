import { Migration } from '@mikro-orm/migrations';

export class Migration20250829000001 extends Migration {

  override async up(): Promise<void> {
    // Add missing columns to blog_post table
    this.addSql(`alter table "blog_post" add column "cover_image" text;`);
    this.addSql(`alter table "blog_post" add column "tags" jsonb;`);
    this.addSql(`alter table "blog_post" add column "language" text not null default 'sk';`);

    // Create indexes for new columns
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_blog_post_cover_image" ON "blog_post" (cover_image) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_blog_post_tags" ON "blog_post" (tags) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_blog_post_language" ON "blog_post" (language) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    // Drop new columns
    this.addSql(`alter table "blog_post" drop column "cover_image";`);
    this.addSql(`alter table "blog_post" drop column "tags";`);
    this.addSql(`alter table "blog_post" drop column "language";`);

    // Drop indexes
    this.addSql(`DROP INDEX IF EXISTS "IDX_blog_post_cover_image";`);
    this.addSql(`DROP INDEX IF EXISTS "IDX_blog_post_tags";`);
    this.addSql(`DROP INDEX IF EXISTS "IDX_blog_post_language";`);
  }

}
