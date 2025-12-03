import { eq } from "drizzle-orm";
import db from "../config/db.js";
import responseHandler from "./responseHandler.js";

// Enhanced getAll function
export const getAll = (table, tableName = 'records') => {
    return async (req, res) => {
        try {
            const rows = await db.select().from(table);
            
            if(rows.length <= 0) {
                return responseHandler(res, 200, false, `No ${tableName} found`, []);
            }

            return responseHandler(res, 200, true, `${tableName} retrieved successfully`, rows);
        } catch (error) {
            console.error(`Error fetching ${tableName}:`, error);
            return responseHandler(res, 500, false, `Failed to retrieve ${tableName}`);
        }
    };
};

// Enhanced getById function
export const getById = (table, tableName = 'record', idColumn = 'id') => {
    return async (req, res) => {
        try {
            const { id } = req.params;
            
            // Validate ID
            if (!id || isNaN(Number(id))) {
                return responseHandler(res, 400, false, 'Invalid or missing ID');
            }

            // Use table parameter instead of hardcoded sectionTable
            const rows = await db.select()
                .from(table)
                .where(eq(table[idColumn], Number(id)))
                .limit(1);
            
            if (rows.length === 0) {
                return responseHandler(res, 404, false, `${tableName} not found`);
            }

            return responseHandler(res, 200, true, `${tableName} found successfully`, rows[0]);
        } catch (error) {
            console.error(`Error fetching ${tableName} by ID:`, error);
            return responseHandler(res, 500, false, `Failed to retrieve ${tableName}`);
        }
    };
};

// Create function
export const create = (table, tableName = 'record') => {
    return async (req, res) => {
        try {
            const data = req.validatedData || req.body;
            
            const [newRecord] = await db.insert(table)
                .values(data)
                .returning();
            
            return responseHandler(res, 201, true, `${tableName} created successfully`, newRecord);
        } catch (error) {
            console.error(`Error creating ${tableName}:`, error);
            return responseHandler(res, 500, false, `Failed to create ${tableName}`);
        }
    };
};

// Update function
export const updateById = (table, tableName = 'record', idColumn = 'id') => {
    return async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.validatedData || req.body;
            
            if (!id || isNaN(Number(id))) {
                return responseHandler(res, 400, false, 'Invalid or missing ID');
            }
            
            const [updatedRecord] = await db.update(table)
                .set(data)
                .where(eq(table[idColumn], Number(id)))
                .returning();
            
            if (!updatedRecord) {
                return responseHandler(res, 404, false, `${tableName} not found`);
            }
            
            return responseHandler(res, 200, true, `${tableName} updated successfully`, updatedRecord);
        } catch (error) {
            console.error(`Error updating ${tableName}:`, error);
            return responseHandler(res, 500, false, `Failed to update ${tableName}`);
        }
    };
};

// Delete function
export const deleteById = (table, tableName = 'record', idColumn = 'id') => {
    return async (req, res) => {
        try {
            const { id } = req.params;
            
            if (!id || isNaN(Number(id))) {
                return responseHandler(res, 400, false, 'Invalid or missing ID');
            }
            
            const deletedRows = await db.delete(table)
                .where(eq(table[idColumn], Number(id)));
            
            if (deletedRows === 0) {
                return responseHandler(res, 404, false, `${tableName} not found`);
            }
            
            return responseHandler(res, 200, true, `${tableName} deleted successfully`);
        } catch (error) {
            console.error(`Error deleting ${tableName}:`, error);
            return responseHandler(res, 500, false, `Failed to delete ${tableName}`);
        }
    };
};