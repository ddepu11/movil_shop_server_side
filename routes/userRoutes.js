import { Router } from 'express';
import multer from 'multer';
import {
  logIn,
  signUp,
  getAccountInfo,
  logOut,
  isEmailRegistered,
} from '../controllers/userController.js';
import authenticateUser from '../middleweres/authenticateUser.js';
// import fileUpload from '../middleweres/fileUpload.js';

const router = Router();

router.post('/login', logIn);

const upload = multer({ dest: 'public/' });

router.post('/sign-up', upload.single('dp'), signUp);

router.get('/account', authenticateUser, getAccountInfo);

router.get('/log-out', logOut);

router.post('/is-email-registered', isEmailRegistered);

export default router;
