import { Router } from 'express';
import {
  signIn,
  signUp,
  getAccountInfo,
  logOut,
  doesUserExists,
  authUser,
  updateUserInfo,
  changeDisplayPicture,
} from '../controllers/userController.js';

import authenticateUser from '../middleweres/authenticateUser.js';
import uploadUserDP from '../middleweres/uploadUserDP.js';

const router = Router();

router.post('/sign-in', signIn);

router.post('/sign-up', uploadUserDP, signUp);

router.get('/account-info', authenticateUser, getAccountInfo);

router.get('/log-out', logOut);

router.post('/exists', doesUserExists);

router.get('/authenticate', authenticateUser, authUser);

router.put('/:id', authenticateUser, updateUserInfo);

router.put('/:id/dp', authenticateUser, uploadUserDP, changeDisplayPicture);

export default router;
