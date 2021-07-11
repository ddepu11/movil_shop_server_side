import { Router } from 'express';
import createOrder from '../controllers/orderController.js';
import authenticateUser from '../middleweres/authenticateUser.js';

const router = Router();

router.post('/', authenticateUser, createOrder);

export default router;
