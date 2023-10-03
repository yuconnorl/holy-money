CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_name" varchar(80) NOT NULL,
	CONSTRAINT "categories_category_name_unique" UNIQUE("category_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "members" (
	"id" serial PRIMARY KEY NOT NULL,
	"member_name" varchar(80) NOT NULL,
	CONSTRAINT "members_member_name_unique" UNIQUE("member_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "records" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" numeric(15, 4) NOT NULL,
	"store_id" text NOT NULL,
	"category_id" text NOT NULL,
	"member_id" text NOT NULL,
	"memo" varchar(80) NOT NULL,
	"record_date" varchar(20) NOT NULL,
	"record_month" varchar(20) NOT NULL,
	"record_day" varchar(10) NOT NULL,
	"record_year" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stores" (
	"id" serial PRIMARY KEY NOT NULL,
	"store_name" varchar(80),
	CONSTRAINT "stores_store_name_unique" UNIQUE("store_name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "records" ADD CONSTRAINT "records_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "records" ADD CONSTRAINT "records_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "records" ADD CONSTRAINT "records_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
