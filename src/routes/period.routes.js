import express from 'express';
import { 
    getAllPeriods, 
    getPeriodById, 
    createPeriod, 
    updatePeriod, 
    deletePeriod,
    getPeriodsByFaqId
} from '../controllers/period.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateBody, validateParams } from '../middleware/validation.js';
import { periodSchema, updatePeriodSchema, periodIdSchema, faqIdSchema } from '../validations/period.validation.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

/**
 * @route   GET /api/periods
 * @desc    Get all periods
 * @access  Public
 */
router.get('/', asyncHandler(getAllPeriods));

/**
 * @route   GET /api/periods/faq/:faqId
 * @desc    Get periods by FAQ ID
 * @access  Public
 */
router.get('/faq/:faqId', 
    validateParams(faqIdSchema),
    asyncHandler(getPeriodsByFaqId)
);

/**
 * @route   GET /api/periods/:id
 * @desc    Get period by ID
 * @access  Public
 */
router.get('/:id', 
    validateParams(periodIdSchema),
    asyncHandler(getPeriodById)
);

/**
 * @route   POST /api/periods
 * @desc    Create new period
 * @access  Private/Admin
 */
router.post('/', 
    authenticate,
    authorize(['admin']),
    validateBody(periodSchema),
    asyncHandler(createPeriod)
);

/**
 * @route   PUT /api/periods/:id
 * @desc    Update period by ID
 * @access  Private/Admin
 */
router.put('/:id', 
    authenticate,
    authorize(['admin']),
    validateParams(periodIdSchema),
    validateBody(updatePeriodSchema),
    asyncHandler(updatePeriod)
);

/**
 * @route   DELETE /api/periods/:id
 * @desc    Delete period by ID
 * @access  Private/Admin
 */
router.delete('/:id', 
    authenticate,
    authorize(['admin']),
    validateParams(periodIdSchema),
    asyncHandler(deletePeriod)
);

export default router;
