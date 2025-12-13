import { Router } from "express";
import { 
    getAllSections, 
    getSectionById, 
    getSectionByType,
    createSection, 
    updateSection, 
    deleteSection 
} from "../controllers/section.controller.js";
import { authenticate, authorize } from "../middleware/auth.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateBody, validateParams } from "../middleware/validation.js";
import { sectionSchema, updateSectionSchema, idSchema, sectionTypeSchema } from "../validations/section.validation.js";

const router = Router();

/**
 * @route   GET /api/sections
 * @desc    Get all sections
 * @access  Public
 */
router.get('/', asyncHandler(getAllSections));

/**
 * @route   GET /api/sections/type/:sectionType
 * @desc    Get section by type
 * @access  Public
 */
router.get('/type/:sectionType', 
    validateParams(sectionTypeSchema),
    asyncHandler(getSectionByType)
);

/**
 * @route   GET /api/sections/:id
 * @desc    Get section by ID
 * @access  Public
 */
router.get('/:id', 
    validateParams(idSchema),
    asyncHandler(getSectionById)
);

/**
 * @route   POST /api/sections
 * @desc    Create new section
 * @access  Private/Admin
 */
router.post('/', 
    authenticate,
    authorize(['admin']),
    validateBody(sectionSchema),
    asyncHandler(createSection)
);

/**
 * @route   PUT /api/sections/:id
 * @desc    Update section by ID
 * @access  Private/Admin
 */
router.put('/:id', 
    authenticate,
    authorize(['admin']),
    validateParams(idSchema),
    validateBody(updateSectionSchema),
    asyncHandler(updateSection)
);

/**
 * @route   DELETE /api/sections/:id
 * @desc    Delete section by ID
 * @access  Private/Admin
 */
router.delete('/:id', 
    authenticate,
    authorize(['admin']),
    validateParams(idSchema),
    asyncHandler(deleteSection)
);export default router;