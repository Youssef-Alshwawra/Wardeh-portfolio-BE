import { Router } from "express";
import { getAllSections } from "../controllers/section.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.get('/', asyncHandler(getAllSections));

export default router;