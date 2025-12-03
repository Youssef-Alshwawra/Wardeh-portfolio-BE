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
import { validateBody, validateParams } from '../middleware/validation.js';
import { 
    subSectionSchema, 
    updateSubSectionSchema, 
    subSectionIdSchema 
} from '../validations/subsection.validation.js';
import asyncHandler from '../utils/asyncHandler.js';
import { z } from 'zod';

const router = express.Router();

// @route GET /subsections - Get all subsections
router.get('/', asyncHandler(getAllSubSections));

// @route GET /subsections/active - Get active subsections only
router.get('/active', asyncHandler(getActiveSubSections));

// @route GET /subsections/section/:sectionId - Get subsections by section ID
router.get('/section/:sectionId', 
    validateParams(z.object({ sectionId: z.string().uuid('Invalid section ID') })),
    asyncHandler(getSubSectionsBySectionId)
);

// @route GET /subsections/:id - Get subsection by ID
router.get('/:id', 
    validateParams(subSectionIdSchema),
    asyncHandler(getSubSectionById)
);

// @route POST /subsections - Create new subsection
router.post('/', 
    validateBody(subSectionSchema),
    asyncHandler(createSubSection)
);

// @route PUT /subsections/:id - Update subsection
router.put('/:id', 
    validateParams(subSectionIdSchema),
    validateBody(updateSubSectionSchema),
    asyncHandler(updateSubSection)
);

// @route DELETE /subsections/:id - Delete subsection
router.delete('/:id', 
    validateParams(subSectionIdSchema),
    asyncHandler(deleteSubSection)
);

export default router;