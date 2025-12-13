import { z } from 'zod';

export const sectionSchema = z.object({
    section_type: z.string()
        .min(1, 'Section type is required')
        .max(50, 'Section type too long'),
    
    title: z.string()
        .min(1, 'Title is required')
        .max(200, 'Title too long'),
    
    subtitle: z.string()
        .max(300, 'Subtitle too long')
        .optional(),
    
    description: z.string()
        .max(1000, 'Description too long')
        .optional(),
    
    order: z.number()
        .int('Order must be a number')
        .min(0, 'Order must be positive')
        .optional(),
    
    is_active: z.boolean()
        .default(true)
        .optional(),
    
    images: z.array(z.string().url('Invalid image URL'))
        .optional()
});

export const updateSectionSchema = sectionSchema.partial();

export const idSchema = z.object({
    id: z.string()
        .regex(/^\d+$/, 'Invalid ID format')
        .transform(Number)
});

export const sectionTypeSchema = z.object({
    sectionType: z.enum(['hero', 'about', 'services', 'tools'])
});