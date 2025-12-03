import express from 'express';
import { 
    getAllSubSections, 
    getSubSectionById, 
    createSubSection, 
    updateSubSection, 
    deleteSubSection,
    getSubSectionsBySectionId,
    getActiveSubSections
} from '../controllers/subsection.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateBody, validateParams } from '../middleware/validation.js';
import { 
    subSectionSchema, 
    updateSubSectionSchema, 
    subSectionIdSchema 
} from '../validations/subsection.validation.js';
import asyncHandler from '../utils/asyncHandler.js';
import { z } from 'zod';

const router = express.Router();

/**
 * @route   GET /api/subsections
 * @desc    Get all subsections
 * @access  Public
 */
router.get('/', asyncHandler(getAllSubSections));

/**
 * @route   GET /api/subsections/active
 * @desc    Get active subsections only
 * @access  Public
 */
router.get('/active', asyncHandler(getActiveSubSections));

/**
 * @route   GET /api/subsections/section/:sectionId
 * @desc    Get subsections by section ID
 * @access  Public
 */
router.get('/section/:sectionId', 
    validateParams(z.object({ sectionId: z.string().uuid('Invalid section ID') })),
    asyncHandler(getSubSectionsBySectionId)
);

/**
 * @route   GET /api/subsections/:id
 * @desc    Get subsection by ID
 * @access  Public
 */
router.get('/:id', 
    validateParams(subSectionIdSchema),
    asyncHandler(getSubSectionById)
);

/**
 * @route   POST /api/subsections
 * @desc    Create new subsection
 * @access  Private/Admin
 */
router.post('/', 
    authenticate,
    authorize(['admin']),
    validateBody(subSectionSchema),
    asyncHandler(createSubSection)
);

/**
 * @route   PUT /api/subsections/:id
 * @desc    Update subsection by ID
 * @access  Private/Admin
 */
router.put('/:id', 
    authenticate,
    authorize(['admin']),
    validateParams(subSectionIdSchema),
    validateBody(updateSubSectionSchema),
    asyncHandler(updateSubSection)
);

/**
 * @route   DELETE /api/subsections/:id
 * @desc    Delete subsection by ID
 * @access  Private/Admin
 */
router.delete('/:id', 
    authenticate,
    authorize(['admin']),
    validateParams(subSectionIdSchema),
    asyncHandler(deleteSubSection)
);

export default router;