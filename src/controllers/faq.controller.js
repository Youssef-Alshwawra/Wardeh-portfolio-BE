import { eq } from "drizzle-orm";
import db from "../config/db.js";
import { faqTable } from "../db/schema.js";
import responseHandler from "../utils/responseHandler.js";
import { getAll, getById, create, updateById, deleteById } from "../utils/curdFactory.js";

export const getAllFaqs = getAll(faqTable, 'FAQs');

export const getFaqById = getById(faqTable, 'FAQ');

export const createFaq = create(faqTable, 'FAQ');

export const updateFaq = updateById(faqTable, 'FAQ');

export const deleteFaq = deleteById(faqTable, 'FAQ');

export const getActiveFaqs = async (req, res) => {
    try {
        const faqs = await db.select()
            .from(faqTable)
            .where(eq(faqTable.isActive, true))
            .orderBy(faqTable.order);
        
        if (faqs.length === 0) {
            return responseHandler(res, 200, false, 'No active FAQs found', []);
        }
        
        return responseHandler(res, 200, true, 'Active FAQs found successfully', faqs);
    } catch (error) {
        console.error('Error fetching active FAQs:', error);
        return responseHandler(res, 500, false, 'Failed to fetch active FAQs');
    }
};