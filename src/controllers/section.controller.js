import db from "../config/db.js"
import { sectionTable } from "../db/schema.js"
import responseHandler from "../utils/responseHandler.js";

export const getAllSections = async (req, res) => {
    const sections = await db.select().from(sectionTable);

    if(sections.length <= 0) {
        return responseHandler(res, 200, 'There is no sections', null, false);
    }

    return responseHandler(res, 200, 'Sections found successfully', sections);
}