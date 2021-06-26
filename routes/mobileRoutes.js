import { Router } from 'express';
import { getMobiles, createMobile } from '../controllers/mobileController.js';
import uploadMobilePics from '../middleweres/uploadMobilePics.js';
import authenticateUser from '../middleweres/authenticateUser.js';

const router = Router();

router.get('/', getMobiles);

router.post('/create', authenticateUser, uploadMobilePics, createMobile);

export default router;
