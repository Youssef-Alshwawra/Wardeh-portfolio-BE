import { eq } from "drizzle-orm";
import db from "../config/db.js";
import { projectTable } from "../db/schema.js";
import responseHandler from "../utils/responseHandler.js";
import { getAll, getById, create, updateById, deleteById } from "../utils/curdFactory.js";

export const getAllProjects = getAll(projectTable, 'projects');

export const getProjectById = getById(projectTable, 'project');

export const createProject = create(projectTable, 'project');

export const updateProject = updateById(projectTable, 'project');

export const deleteProject = deleteById(projectTable, 'project');

export const getProjectBySlug = async (req, res) => {
    try {
        const { slug } = req.validatedParams || req.params;
        
        const projects = await db.select()
            .from(projectTable)
            .where(eq(projectTable.slug, slug))
            .limit(1);
        
        if (projects.length === 0) {
            return responseHandler(res, 404, false, 'Project not found');
        }
        
        return responseHandler(res, 200, true, 'Project found successfully', projects[0]);
    } catch (error) {
        console.error('Error fetching project by slug:', error);
        return responseHandler(res, 500, false, 'Failed to fetch project');
    }
};

export const getProjectsByCategory = async (req, res) => {
    try {
        const { category } = req.validatedParams || req.params;
        
        const projects = await db.select()
            .from(projectTable)
            .where(eq(projectTable.category, category))
            .orderBy(projectTable.order);
        
        if (projects.length === 0) {
            return responseHandler(res, 200, false, 'No projects found in this category', []);
        }
        
        return responseHandler(res, 200, true, 'Projects found successfully', projects);
    } catch (error) {
        console.error('Error fetching projects by category:', error);
        return responseHandler(res, 500, false, 'Failed to fetch projects');
    }
};

export const getActiveProjects = async (req, res) => {
    try {
        const projects = await db.select()
            .from(projectTable)
            .where(eq(projectTable.isActive, true))
            .orderBy(projectTable.order);
        
        if (projects.length === 0) {
            return responseHandler(res, 200, false, 'No active projects found', []);
        }
        
        return responseHandler(res, 200, true, 'Active projects found successfully', projects);
    } catch (error) {
        console.error('Error fetching active projects:', error);
        return responseHandler(res, 500, false, 'Failed to fetch active projects');
    }
};

export const getFeaturedProjects = async (req, res) => {
    try {
        const projects = await db.select()
            .from(projectTable)
            .where(eq(projectTable.isFeatured, true))
            .orderBy(projectTable.order);
        
        if (projects.length === 0) {
            return responseHandler(res, 200, false, 'No featured projects found', []);
        }
        
        return responseHandler(res, 200, true, 'Featured projects found successfully', projects);
    } catch (error) {
        console.error('Error fetching featured projects:', error);
        return responseHandler(res, 500, false, 'Failed to fetch featured projects');
    }
};