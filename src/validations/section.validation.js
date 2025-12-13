import { z } from 'zod';

export const sectionSchema = z.object({
    sectionType: z.enum(['hero', 'about', 'services', 'tools'], {
        errorMap: () => ({ message: 'Section type must be: hero, about, services, or tools' })
    }),
    
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
    
    isActive: z.union([z.boolean(), z.number().int().min(0).max(1)])
        .transform(val => typeof val === 'boolean' ? (val ? 1 : 0) : val)
        .default(1)
        .optional(),
    
    image: z.string()
        .url('Invalid image URL')
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