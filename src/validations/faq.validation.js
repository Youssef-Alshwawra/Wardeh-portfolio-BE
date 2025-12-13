import { z } from 'zod';

export const faqSchema = z.object({
    question: z.string()
        .min(5, 'Question must be at least 5 characters')
        .max(500, 'Question must be less than 500 characters'),
    
    answer: z.string()
        .min(10, 'Answer must be at least 10 characters')
        .max(2000, 'Answer must be less than 2000 characters'),
    
    period: z.string()
        .min(2, 'Period must be at least 2 characters')
        .max(100, 'Period must be less than 100 characters')
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

export const faqPeriodSchema = z.object({
    period: z.string()
        .min(1, 'Period is required')
});