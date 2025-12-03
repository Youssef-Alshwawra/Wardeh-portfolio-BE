import { Router } from 'express';
import sectionRoutes from './section.routes.js';
import subsectionRoutes from './subsection.routes.js';

const router = Router();

router.use('/api/sections', sectionRoutes);
router.use('/api/subsections', subsectionRoutes);

export default router;