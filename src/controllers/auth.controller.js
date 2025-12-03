import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import db from '../config/db.js';
import { userTable } from '../db/schema.js';
import responseHandler from '../utils/responseHandler.js';
import { generateToken } from '../middleware/auth.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.validatedBody || req.body;

        const user = await db.select()
            .from(userTable)
            .where(eq(userTable.email, email.toLowerCase()))
            .limit(1);

        if (user.length === 0) {
            return responseHandler(res, 401, false, 'Invalid email or password');
        }

        const foundUser = user[0];

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return responseHandler(res, 401, false, 'Invalid email or password');
        }

        const token = generateToken({
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role,
            name: foundUser.name
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return responseHandler(res, 200, true, 'Login successful', {
            user: {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        return responseHandler(res, 500, false, 'Login failed');
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.validatedBody || req.body;

        const existingUser = await db.select()
            .from(userTable)
            .where(eq(userTable.email, email.toLowerCase()))
            .limit(1);

        if (existingUser.length > 0) {
            return responseHandler(res, 400, false, 'User with this email already exists');
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await db.insert(userTable).values({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role: role || 'user'
        }).returning({
            id: userTable.id,
            name: userTable.name,
            email: userTable.email,
            role: userTable.role
        });

        return responseHandler(res, 201, true, 'User registered successfully', newUser[0]);
    } catch (error) {
        console.error('Registration error:', error);
        return responseHandler(res, 500, false, 'Registration failed');
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie('token');
        return responseHandler(res, 200, true, 'Logout successful');
    } catch (error) {
        console.error('Logout error:', error);
        return responseHandler(res, 500, false, 'Logout failed');
    }
};

export const getMe = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await db.select({
            id: userTable.id,
            name: userTable.name,
            email: userTable.email,
            role: userTable.role
        })
        .from(userTable)
        .where(eq(userTable.id, userId))
        .limit(1);

        if (user.length === 0) {
            return responseHandler(res, 404, false, 'User not found');
        }

        return responseHandler(res, 200, true, 'User profile retrieved successfully', user[0]);
    } catch (error) {
        console.error('Get user profile error:', error);
        return responseHandler(res, 500, false, 'Failed to get user profile');
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await db.select({
            id: userTable.id,
            name: userTable.name,
            email: userTable.email,
            role: userTable.role
        })
        .from(userTable);

        return responseHandler(res, 200, true, 'Users retrieved successfully', users);
    } catch (error) {
        console.error('Get all users error:', error);
        return responseHandler(res, 500, false, 'Failed to retrieve users');
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.validatedParams || req.params;

        if (req.user.id === id) {
            return responseHandler(res, 400, false, 'Cannot delete your own account');
        }

        const deletedUser = await db.delete(userTable)
            .where(eq(userTable.id, id))
            .returning({
                id: userTable.id,
                name: userTable.name,
                email: userTable.email
            });

        if (deletedUser.length === 0) {
            return responseHandler(res, 404, false, 'User not found');
        }

        return responseHandler(res, 200, true, 'User deleted successfully', deletedUser[0]);
    } catch (error) {
        console.error('Delete user error:', error);
        return responseHandler(res, 500, false, 'Failed to delete user');
    }
};