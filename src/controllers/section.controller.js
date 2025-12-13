import { eq } from "drizzle-orm";
import db from "../config/db.js";
import { sectionTable, subSectionTable } from "../db/schema.js"
import { getAll, getById, create, updateById, deleteById } from "../utils/curdFactory.js";
import responseHandler from "../utils/responseHandler.js";

export const getAllSections = getAll(sectionTable, 'sections');

export const getSectionById = getById(sectionTable, 'section');

export const getSectionByType = async (req, res) => {
    const { sectionType } = req.params;
    
    const section = await db.select()
        .from(sectionTable)
        .where(eq(sectionTable.sectionType, sectionType))
        .limit(1);
    
    if (!section.length) {
        return responseHandler(res, 404, false, 'Section not found');
    }
    
    const subsections = await db.select()
        .from(subSectionTable)
        .where(eq(subSectionTable.sectionId, section[0].id))
        .orderBy(subSectionTable.order);
    
    const result = {
        ...section[0],
        subsections
    };
    
    return responseHandler(res, 200, true, 'Section found successfully', result);
};

export const createSection = create(sectionTable, 'section');

export const updateSection = updateById(sectionTable, 'section');

export const deleteSection = deleteById(sectionTable, 'section');