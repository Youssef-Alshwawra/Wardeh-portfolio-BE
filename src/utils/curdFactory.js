import { eq } from "drizzle-orm";
import db from "../config/db.js"
import { sectionTable } from "../db/schema.js";
import responseHandler from "./responseHandler.js";

export const getAll = (table) => {
    return async (req, res) => {
        const rows = await db.select().from(table);
        
        if(rows.length <= 0) {
            return responseHandler(res, 500, false, `There is no data!`);
        }

        return responseHandler(res, 200, true, `Data found successfully!`, rows);
    }
}

export const getById = (table) => {
    return async (req, res) => {
        const { id } = req.params;
        
        if(!id) {
            return responseHandler(res, 500, false, `No id provided!`);
        }

        const row = await db.select().from(sectionTable).where(eq(sectionTable.id, id));
        
        responseHandler(res, 200, true, `Section found successfully!`);
    }
}