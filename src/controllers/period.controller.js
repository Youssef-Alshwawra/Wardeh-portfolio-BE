import { eq } from "drizzle-orm";
import db from "../config/db.js";
import { periodTable } from "../db/schema.js";
import responseHandler from "../utils/responseHandler.js";
import { getAll, getById, create, updateById, deleteById } from "../utils/curdFactory.js";

export const getAllPeriods = getAll(periodTable, 'periods');

export const getPeriodById = getById(periodTable, 'period');

export const createPeriod = create(periodTable, 'period');

export const updatePeriod = updateById(periodTable, 'period');

export const deletePeriod = deleteById(periodTable, 'period');

export const getPeriodsByFaqId = async (req, res) => {
    try {
        const { faqId } = req.params;
        
        const periods = await db.select()
            .from(periodTable)
            .where(eq(periodTable.faqId, faqId))
            .orderBy(periodTable.order);
        
        if (periods.length === 0) {
            return responseHandler(res, 200, false, 'No periods found for this FAQ', []);
        }
        
        return responseHandler(res, 200, true, 'Periods found successfully', periods);
    } catch (error) {
        console.error('Error fetching periods by FAQ ID:', error);
        return responseHandler(res, 500, false, 'Failed to fetch periods');
    }
};
