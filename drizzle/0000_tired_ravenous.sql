CREATE TYPE "public"."sectionTypeEnum" AS ENUM('hero', 'about', 'services', 'tools');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar NOT NULL,
	"password" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"section_type" "sectionTypeEnum" NOT NULL,
	"title" varchar(255) NOT NULL,
	"subtitle" text,
	"description" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"is_active" integer DEFAULT 1 NOT NULL,
	"images" text
);
--> statement-breakpoint
CREATE TABLE "sub_sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"section_id" uuid NOT NULL,
	"title" varchar(255),
	"description" text,
	"icon" text,
	"background_color" varchar(50),
	"button_text" varchar(100),
	"button_link" varchar,
	"order" integer DEFAULT 0 NOT NULL,
	"image" text[],
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sub_sections" ADD CONSTRAINT "sub_sections_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;