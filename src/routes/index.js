import { Router } from 'express';
import sectionRoutes from './section.routes.js';
import subsectionRoutes from './subsection.routes.js';
import authRoutes from './auth.routes.js';
import faqRoutes from './faq.routes.js';
import projectRoutes from './project.routes.js';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/sections', sectionRoutes);
router.use('/api/subsections', subsectionRoutes);
router.use('/api/faqs', faqRoutes);
router.use('/api/projects', projectRoutes);

export default router;