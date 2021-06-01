import { Router } from 'express';
import {
  logIn,
  signUp,
  getAccountInfo,
  logOut,
} from '../controllers/userController.js';
import authenticateUser from '../middleweres/authenticateUser.js';

const router = Router();

router.post('/login', logIn);

router.post('/sign-up', signUp);

router.get('/account', authenticateUser, getAccountInfo);

router.get('/log-out', logOut);

export default router;
