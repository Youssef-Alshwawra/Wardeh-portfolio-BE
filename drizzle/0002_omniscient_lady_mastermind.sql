CREATE TYPE "public"."projectCategoryEnum" AS ENUM('ui_design', 'ux_research', 'web_development', 'mobile_development', 'other');--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"periods" text,
	"order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"category" "projectCategoryEnum" NOT NULL,
	"thumbnail" text NOT NULL,
	"short_description" text NOT NULL,
	"project_type" varchar(100),
	"my_role" varchar(100) NOT NULL,
	"timeline" varchar(50) NOT NULL,
	"tools_used" text NOT NULL,
	"images" text NOT NULL,
	"full_description" text,
	"project_url" varchar,
	"github_url" varchar,
	"order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
