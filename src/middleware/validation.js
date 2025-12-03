import responseHandler from '../utils/responseHandler.js';

// Simple validation middleware
export const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            const result = schema.safeParse(req.body);
            
            if (!result.success) {
                const errors = result.error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                
                return responseHandler(res, 400, false, 'Validation failed', { errors });
            }
            
            req.validatedData = result.data;
            next();
        } catch (error) {
            return responseHandler(res, 500, false, 'Validation error occurred');
        }
    };
};

export const validateParams = (schema) => {
    return (req, res, next) => {
        try {
            const result = schema.safeParse(req.params);
            
            if (!result.success) {
                const errors = result.error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                
                return responseHandler(res, 400, false, 'Invalid parameters', { errors });
            }
            
            req.validatedParams = result.data;
            next();
        } catch (error) {
            return responseHandler(res, 500, false, 'Parameter validation error');
        }
    };
};