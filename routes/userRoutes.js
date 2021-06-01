import { Router } from 'express';
import {
  logIn,
  signUp,
  getAccountInfo,
} from '../controllers/userController.js';
import authenticateUser from '../middleweres/authenticateUser.js';

const router = Router();

router.post('/login', logIn);

router.post('/sign-up', signUp);

router.get('/account', authenticateUser, getAccountInfo);

export default router;
