import express from 'express';
import { 
    getAllProjects, 
    getProjectById, 
    createProject, 
    updateProject, 
    deleteProject,
    getProjectBySlug,
    getProjectsByCategory,
    getActiveProjects,
    getFeaturedProjects
} from '../controllers/project.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateBody, validateParams } from '../middleware/validation.js';
import { 
    projectSchema, 
    updateProjectSchema, 
    projectIdSchema,
    projectSlugSchema,
    projectCategorySchema
} from '../validations/project.validation.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

/**
 * @route   GET /api/projects
 * @desc    Get all projects
 * @access  Public
 */
router.get('/', asyncHandler(getAllProjects));

/**
 * @route   GET /api/projects/active
 * @desc    Get active projects only
 * @access  Public
 */
router.get('/active', asyncHandler(getActiveProjects));

/**
 * @route   GET /api/projects/featured
 * @desc    Get featured projects
 * @access  Public
 */
router.get('/featured', asyncHandler(getFeaturedProjects));

/**
 * @route   GET /api/projects/category/:category
 * @desc    Get projects by category
 * @access  Public
 */
router.get('/category/:category', 
    validateParams(projectCategorySchema),
    asyncHandler(getProjectsByCategory)
);

/**
 * @route   GET /api/projects/slug/:slug
 * @desc    Get project by slug
 * @access  Public
 */
router.get('/slug/:slug', 
    validateParams(projectSlugSchema),
    asyncHandler(getProjectBySlug)
);

/**
 * @route   GET /api/projects/:id
 * @desc    Get project by ID
 * @access  Public
 */
router.get('/:id', 
    validateParams(projectIdSchema),
    asyncHandler(getProjectById)
);

/**
 * @route   POST /api/projects
 * @desc    Create new project
 * @access  Private/Admin
 */
router.post('/', 
    authenticate,
    authorize(['admin']),
    validateBody(projectSchema),
    asyncHandler(createProject)
);

/**
 * @route   PUT /api/projects/:id
 * @desc    Update project by ID
 * @access  Private/Admin
 */
router.put('/:id', 
    authenticate,
    authorize(['admin']),
    validateParams(projectIdSchema),
    validateBody(updateProjectSchema),
    asyncHandler(updateProject)
);

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete project by ID
 * @access  Private/Admin
 */
router.delete('/:id', 
    authenticate,
    authorize(['admin']),
    validateParams(projectIdSchema),
    asyncHandler(deleteProject)
);

export default router;