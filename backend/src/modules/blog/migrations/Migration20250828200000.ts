import { Migration } from '@mikro-orm/migrations';

export class Migration20250828200000 extends Migration {

  override async up(): Promise<void> {
    // Add status column to existing blog_post table
    this.addSql(`alter table "blog_post" add column "status" text check ("status" in ('draft', 'published')) not null default 'draft';`);

    // Create index on status column
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_blog_post_status" ON "blog_post" (status) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    // Drop status column
    this.addSql(`alter table "blog_post" drop column "status";`);

    // Drop index
    this.addSql(`DROP INDEX IF EXISTS "IDX_blog_post_status";`);
  }

}
