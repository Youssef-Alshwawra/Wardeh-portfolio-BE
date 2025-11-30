import { Router } from 'express';
import sectionRoutes from './section.routes';

const router = Router();

router.use('/api/sections', sectionRoutes);


export default router;