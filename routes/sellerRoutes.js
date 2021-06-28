import express from 'express';
import getSellerMobiles from '../controllers/sellerController.js';
import authenticateUser from '../middleweres/authenticateUser.js';

const router = express.Router();

router.get('/:sellerId/mobiles/list', authenticateUser, getSellerMobiles);

export default router;
