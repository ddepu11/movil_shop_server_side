import express from 'express';
import {
  deleteSellerMobile,
  getSellerMobiles,
} from '../controllers/sellerController.js';
import authenticateUser from '../middleweres/authenticateUser.js';

const router = express.Router();

router.get('/:sellerId/mobiles/list', authenticateUser, getSellerMobiles);
router.delete('/mobiles/:id', authenticateUser, deleteSellerMobile);

export default router;
