import db from "../config/db"
import { sectionTable } from "../db/schema.js"

export const getAllSections = async (req, res) => {
    const sections = await db.select().from(sectionTable);
    res.status(200).json(sections);
}