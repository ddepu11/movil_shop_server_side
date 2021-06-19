import { Router } from 'express';
import { getMobiles, createMobile } from '../controllers/mobileController.js';

const router = Router();

router.get('/all', getMobiles);

router.post('/create', createMobile);

export default router;
