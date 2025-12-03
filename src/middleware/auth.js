import jwt from 'jsonwebtoken';
import responseHandler from '../utils/responseHandler.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return responseHandler(res, 401, false, 'Access denied. No token provided.');
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return responseHandler(res, 401, false, 'Invalid token.');
    }
};

export const authorize = (roles = []) => {

    return (req, res, next) => {
        if (!req.user) {
            return responseHandler(res, 401, false, 'Access denied. Please login first.');
        }

        if (!roles.includes(req.user.role)) {
            return responseHandler(res, 403, false, 'Access denied. Insufficient permissions.');
        }

        next();
    };
};

export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};