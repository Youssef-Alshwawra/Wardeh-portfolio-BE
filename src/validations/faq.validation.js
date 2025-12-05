import { z } from 'zod';

const periodSchema = z.object({
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
        .optional()
});

export const faqSchema = z.object({
    question: z.string()
        .min(5, 'Question must be at least 5 characters')
        .max(500, 'Question must be less than 500 characters'),
    
    answer: z.string()
        .min(10, 'Answer must be at least 10 characters')
        .max(2000, 'Answer must be less than 2000 characters'),
    
    periods: z.array(periodSchema)
        .optional(),
    
    order: z.number()
        .int('Order must be an integer')
        .min(0, 'Order must be positive')
        .default(0),
    
    isActive: z.boolean()
        .default(true)
        .optional()
});

export const updateFaqSchema = faqSchema.partial();

export const faqIdSchema = z.object({
    id: z.string().uuid('Invalid FAQ ID')
});