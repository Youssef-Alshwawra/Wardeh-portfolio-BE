import { pgTable, text, uuid, varchar, integer, pgEnum, boolean } from "drizzle-orm/pg-core";

export const sectionTypeEnum = pgEnum('sectionTypeEnum', [
    'hero',
    'about',
    'services',
    'tools',
]);

export const roleEnum = pgEnum('roleEnum', [
    'admin',
    'user',
]);

export const projectCategoryEnum = pgEnum('projectCategoryEnum', [
    'ui_design',
    'ux_research',
    'web_development',
    'mobile_development',
    'other'
]);

export const sectionTable = pgTable('sections', {
    id: uuid('id').primaryKey().defaultRandom(),
    sectionType: sectionTypeEnum('section_type').notNull(),
    title: varchar('title', { length: 255 }).notNull(), // "About Me", "My Services", etc.
    subtitle: text('subtitle'), // "Who I am?", "What do I offer?", etc.
    description: text('description').notNull(),
    order: integer('order').notNull().default(0), // لترتيب الأقسام
    isActive: integer('is_active').notNull().default(1), // 1 = active, 0 = inactive
    image: text('images') // main image URL
});

export const subSectionTable = pgTable('sub_sections', {
    id: uuid('id').primaryKey().defaultRandom(),
    sectionId: uuid('section_id').notNull().references(() => sectionTable.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }), // "User Interface Design", "User Experience Research"
    description: text('description'), // "I create clean, modern interfaces..."
    icon: text('icon'), // Icon URL or icon name
    backgroundColor: varchar('background_color', { length: 50 }), // Color for the border/background (e.g., "#10B981", "green", "orange")
    buttonText: varchar('button_text', { length: 100 }), // "Let's Design It", "Start Research"
    buttonLink: varchar('button_link'), // Link for the button
    order: integer('order').notNull().default(0), // Order within the section
    images: text('image').array(),
    isActive: boolean('is_active').notNull().default(true) // true = active, false = inactive
});

export const userTable = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    password: text('password').notNull(),
    role: roleEnum('role').notNull().default('user'),
});

export const faqTable = pgTable('faqs', {
    id: uuid('id').primaryKey().defaultRandom(),
    question: text('question').notNull(),
    answer: text('answer').notNull(),
    periods: text('periods', { mode: 'json' }),
    order: integer('order').notNull().default(0),
    isActive: boolean('is_active').notNull().default(true)
});

export const projectTable = pgTable('projects', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).unique().notNull(),
    category: projectCategoryEnum('category').notNull(),
    thumbnail: text('thumbnail').notNull(),
    shortDescription: text('short_description').notNull(),
    projectType: varchar('project_type', { length: 100 }),
    myRole: varchar('my_role', { length: 100 }).notNull(),
    timeline: varchar('timeline', { length: 50 }).notNull(),
    toolsUsed: text('tools_used', { mode: 'json' }).notNull(),
    images: text('images', { mode: 'json' }).notNull(),
    fullDescription: text('full_description'),
    projectUrl: varchar('project_url'),
    githubUrl: varchar('github_url'),
    order: integer('order').notNull().default(0),
    isActive: boolean('is_active').notNull().default(true),
    isFeatured: boolean('is_featured').notNull().default(false)
});
