import { z } from 'zod';

export const periodSchema = z.object({
    faqId: z.string()
        .uuid('Invalid FAQ ID'),
    
    company: z.string()
        .min(2, 'Company name must be at least 2 characters')
        .max(100, 'Company name must be less than 100 characters'),
    
    position: z.string()
        .min(2, 'Position must be at least 2 characters')
        .max(100, 'Position must be less than 100 characters')
        .optional(),
    
    startDate: z.string()
        .regex(/^\d{4}-\d{2}$/, 'Start date must be in YYYY-MM format'),
    
    endDate: z.string()
        .regex(/^(\d{4}-\d{2}|Present)$/, 'End date must be in YYYY-MM format or "Present"'),
    
    description: z.string()
        .max(500, 'Description must be less than 500 characters')
        .optional(),
    
    order: z.number()
        .int('Order must be an integer')
        .min(0, 'Order must be positive')
        .default(0)
        .optional()
});

export const updatePeriodSchema = periodSchema.partial();

export const periodIdSchema = z.object({
    id: z.string().uuid('Invalid period ID')
});

export const faqIdSchema = z.object({
    faqId: z.string().uuid('Invalid FAQ ID')
});
