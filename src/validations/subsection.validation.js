import { z } from 'zod';

export const subSectionSchema = z.object({
    sectionId: z.string()
        .uuid('Invalid section ID')
        .min(1, 'Section ID is required'),
    
    title: z.string()
        .max(255, 'Title must be less than 255 characters')
        .optional(),
    
    description: z.string()
        .optional(),
    
    icon: z.string()
        .optional(),
    
    backgroundColor: z.string()
        .max(50, 'Background color must be less than 50 characters')
        .optional(),
    
    buttonText: z.string()
        .max(100, 'Button text must be less than 100 characters')
        .optional(),
    
    buttonLink: z.string()
        .optional(),
    
    order: z.number()
        .int('Order must be an integer')
        .min(0, 'Order must be positive')
        .default(0),
    
    images: z.array(z.string())
        .optional(),
    
    isActive: z.boolean()
        .default(true)
        .optional()
});

export const updateSubSectionSchema = subSectionSchema.partial();

export const subSectionIdSchema = z.object({
    id: z.string()
        .uuid('Invalid subsection ID')
});