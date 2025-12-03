import { Router } from "express";
import { 
    getAllSections, 
    getSectionById, 
    createSection, 
    updateSection, 
    deleteSection 
} from "../controllers/section.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateBody, validateParams } from "../middleware/validation.js";
import { sectionSchema, updateSectionSchema, idSchema } from "../validations/section.validation.js";

const router = Router();

// @route GET /sections - Get all sections
router.get('/', asyncHandler(getAllSections));

// @route GET /sections/:id - Get section by ID
router.get('/:id', 
    validateParams(idSchema),
    asyncHandler(getSectionById)
);

// @route POST /sections - Create new section
router.post('/', 
    validateBody(sectionSchema),
    asyncHandler(createSection)
);

// @route PUT /sections/:id - Update section
router.put('/:id',
    validateParams(idSchema),
    validateBody(updateSectionSchema),
    asyncHandler(updateSection)
);

// @route DELETE /sections/:id - Delete section
router.delete('/:id',
    validateParams(idSchema),
    asyncHandler(deleteSection)
);

export default router;