CREATE TABLE "periods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"faq_id" uuid NOT NULL,
	"company" varchar(100) NOT NULL,
	"position" varchar(100),
	"start_date" varchar(7) NOT NULL,
	"end_date" varchar(7) NOT NULL,
	"description" text,
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "periods" ADD CONSTRAINT "periods_faq_id_faqs_id_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "faqs" DROP COLUMN "periods";