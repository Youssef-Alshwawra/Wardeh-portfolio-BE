import { eq } from "drizzle-orm";
import db from "../config/db.js";
import { subSectionTable } from "../db/schema.js";
import responseHandler from "../utils/responseHandler.js";
import { getAll, getById, create, updateById, deleteById } from "../utils/curdFactory.js";

export const getAllSubSections = getAll(subSectionTable, 'subsections');

export const getSubSectionById = getById(subSectionTable, 'subsection');

export const createSubSection = create(subSectionTable, 'subsection');

export const updateSubSection = updateById(subSectionTable, 'subsection');

export const deleteSubSection = deleteById(subSectionTable, 'subsection');

export const getSubSectionsBySectionId = async (req, res) => {
    try {
        const { sectionId } = req.validatedParams || req.params;
        
        if (!sectionId) {
            return responseHandler(res, 400, false, 'Section ID is required');
        }
        
        const subSections = await db.select()
            .from(subSectionTable)
            .where(eq(subSectionTable.sectionId, sectionId))
            .orderBy(subSectionTable.order);
        
        if (subSections.length === 0) {
            return responseHandler(res, 200, false, 'No subsections found for this section', []);
        }
        
        return responseHandler(res, 200, true, 'SubSections found successfully', subSections);
    } catch (error) {
        console.error('Error fetching subsections by section ID:', error);
        return responseHandler(res, 500, false, 'Failed to fetch subsections');
    }
};

export const getActiveSubSections = async (req, res) => {
    try {
        const subSections = await db.select()
            .from(subSectionTable)
            .where(eq(subSectionTable.isActive, true))
            .orderBy(subSectionTable.order);
        
        if (subSections.length === 0) {
            return responseHandler(res, 200, false, 'No active subsections found', []);
        }
        
        return responseHandler(res, 200, true, 'Active subsections found successfully', subSections);
    } catch (error) {
        console.error('Error fetching active subsections:', error);
        return responseHandler(res, 500, false, 'Failed to fetch active subsections');
    }
};