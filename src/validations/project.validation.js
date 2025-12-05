import { z } from 'zod';

export const projectSchema = z.object({
    title: z.string()
        .min(3, 'Title must be at least 3 characters')
        .max(255, 'Title must be less than 255 characters'),
    
    slug: z.string()
        .min(3, 'Slug must be at least 3 characters')
        .max(255, 'Slug must be less than 255 characters')
        .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
    
    category: z.enum(['ui_design', 'ux_research', 'web_development', 'mobile_development', 'other'], {
        required_error: 'Category is required'
    }),
    
    thumbnail: z.string()
        .url('Thumbnail must be a valid URL'),
    
    shortDescription: z.string()
        .min(10, 'Short description must be at least 10 characters')
        .max(300, 'Short description must be less than 300 characters'),
    
    projectType: z.string()
        .max(100, 'Project type must be less than 100 characters')
        .optional(),
    
    myRole: z.string()
        .min(2, 'Role must be at least 2 characters')
        .max(100, 'Role must be less than 100 characters'),
    
    timeline: z.string()
        .min(2, 'Timeline must be at least 2 characters')
        .max(50, 'Timeline must be less than 50 characters'),
    
    toolsUsed: z.array(z.string())
        .min(1, 'At least one tool is required'),
    
    images: z.array(z.string().url('Each image must be a valid URL'))
        .min(1, 'At least one image is required'),
    
    fullDescription: z.string()
        .min(50, 'Full description must be at least 50 characters')
        .optional(),
    
    projectUrl: z.string()
        .url('Project URL must be valid')
        .optional(),
    
    githubUrl: z.string()
        .url('GitHub URL must be valid')
        .optional(),
    
    order: z.number()
        .int('Order must be an integer')
        .min(0, 'Order must be positive')
        .default(0),
    
    isActive: z.boolean()
        .default(true)
        .optional(),
    
    isFeatured: z.boolean()
        .default(false)
        .optional()
});

export const updateProjectSchema = projectSchema.partial();

export const projectIdSchema = z.object({
    id: z.string().uuid('Invalid project ID')
});

export const projectSlugSchema = z.object({
    slug: z.string().min(1, 'Slug is required')
});

export const projectCategorySchema = z.object({
    category: z.enum(['ui_design', 'ux_research', 'web_development', 'mobile_development', 'other'])
});