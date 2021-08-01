import { Router } from 'express';
import {
  getMobiles,
  createMobile,
  getMobile,
  reviewMobile,
  updateMobileReview,
  deleteMobile,
} from '../controllers/mobileController.js';
import uploadMobilePics from '../middleweres/uploadMobilePics.js';
import authenticateUser from '../middleweres/authenticateUser.js';

const router = Router();

router.get('/', getMobiles);

router.get('/:mobileId', getMobile);

router.post('/', authenticateUser, uploadMobilePics, createMobile);

router.post('/review', authenticateUser, reviewMobile);

router.put('/review', authenticateUser, updateMobileReview);

router.delete('/:mobileId', authenticateUser, deleteMobile);

export default router;
