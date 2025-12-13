import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { sectionTable } from "../db/schema.js"
import { getAll, getById, create, updateById, deleteById } from "../utils/curdFactory.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const getAllSections = getAll(sectionTable, 'sections');

export const getSectionById = getById(sectionTable, 'section');

export const getSectionByType = async (req, res) => {
    const { sectionType } = req.params;
    
    const section = await db.select()
        .from(sectionTable)
        .where(eq(sectionTable.sectionType, sectionType))
        .limit(1);
    
    if (!section.length) {
        return errorResponse(res, 'Section not found', 404);
    }
    
    return successResponse(res, section[0]);
};

export const createSection = create(sectionTable, 'section');

export const updateSection = updateById(sectionTable, 'section');

export const deleteSection = deleteById(sectionTable, 'section');