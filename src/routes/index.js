import { Router } from 'express';
import sectionRoutes from './section.routes.js';

const router = Router();

router.use('/api/sections', sectionRoutes);

export default router;