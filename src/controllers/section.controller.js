import { eq } from "drizzle-orm";
import db from "../config/db.js"
import { sectionTable } from "../db/schema.js"
import responseHandler from "../utils/responseHandler.js";
import { getAll, getById, create, updateById, deleteById } from "../utils/curdFactory.js";

// Using enhanced CRUD factory functions
export const getAllSections = getAll(sectionTable, 'sections');

export const getSectionById = getById(sectionTable, 'section');

export const createSection = create(sectionTable, 'section');

export const updateSection = updateById(sectionTable, 'section');

export const deleteSection = deleteById(sectionTable, 'section');