import express from 'express';
import { 
    getAllFaqs, 
    getFaqById, 
    createFaq, 
    updateFaq, 
    deleteFaq,
    getActiveFaqs
} from '../controllers/faq.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateBody, validateParams } from '../middleware/validation.js';
import { faqSchema, updateFaqSchema, faqIdSchema } from '../validations/faq.validation.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

/**
 * @route   GET /api/faqs
 * @desc    Get all FAQs
 * @access  Public
 */
router.get('/', asyncHandler(getAllFaqs));

/**
 * @route   GET /api/faqs/active
 * @desc    Get active FAQs only
 * @access  Public
 */
router.get('/active', asyncHandler(getActiveFaqs));

/**
 * @route   GET /api/faqs/:id
 * @desc    Get FAQ by ID
 * @access  Public
 */
router.get('/:id', 
    validateParams(faqIdSchema),
    asyncHandler(getFaqById)
);

/**
 * @route   POST /api/faqs
 * @desc    Create new FAQ
 * @access  Private/Admin
 */
router.post('/', 
    authenticate,
    authorize(['admin']),
    validateBody(faqSchema),
    asyncHandler(createFaq)
);

/**
 * @route   PUT /api/faqs/:id
 * @desc    Update FAQ by ID
 * @access  Private/Admin
 */
router.put('/:id', 
    authenticate,
    authorize(['admin']),
    validateParams(faqIdSchema),
    validateBody(updateFaqSchema),
    asyncHandler(updateFaq)
);

/**
 * @route   DELETE /api/faqs/:id
 * @desc    Delete FAQ by ID
 * @access  Private/Admin
 */
router.delete('/:id', 
    authenticate,
    authorize(['admin']),
    validateParams(faqIdSchema),
    asyncHandler(deleteFaq)
);

export default router;