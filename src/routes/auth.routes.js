import express from 'express';
import { 
    login, 
    register, 
    logout, 
    getMe, 
    getAllUsers, 
    deleteUser 
} from '../controllers/auth.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateBody, validateParams } from '../middleware/validation.js';
import { loginSchema, registerSchema, userIdSchema } from '../validations/auth.validation.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', 
    validateBody(loginSchema),
    asyncHandler(login)
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Public
 */
router.post('/logout', asyncHandler(logout));

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', 
    authenticate,
    asyncHandler(getMe)
);

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Private/Admin
 */
router.post('/register',
    validateBody(registerSchema),
    asyncHandler(register)
);

/**
 * @route   GET /api/auth/users
 * @desc    Get all users
 * @access  Private/Admin
 */
router.get('/users', 
    authenticate,
    authorize(['admin']),
    asyncHandler(getAllUsers)
);

/**
 * @route   DELETE /api/auth/users/:id
 * @desc    Delete user by ID
 * @access  Private/Admin
 */
router.delete('/users/:id', 
    authenticate,
    authorize(['admin']),
    validateParams(userIdSchema),
    asyncHandler(deleteUser)
);

export default router;