import { Router } from 'express';
import {
  logIn,
  signUp,
  getAccountInfo,
  logOut,
  isEmailRegistered,
} from '../controllers/userController.js';
import authenticateUser from '../middleweres/authenticateUser.js';
// import fileUpload from '../middleweres/fileUpload.js';
import uploadUserDP from '../middleweres/uploadUserDP.js';

const router = Router();

router.post('/login', logIn);

router.post('/sign-up', uploadUserDP, signUp);

router.get('/account', authenticateUser, getAccountInfo);

router.get('/log-out', logOut);

router.post('/is-email-registered', isEmailRegistered);

export default router;
