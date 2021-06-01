import { Router } from 'express';
import { logIn, signUp, getUserInfo } from '../controllers/userController.js';

const router = Router();

// Loggin in user
router.post('/login', logIn);

router.post('/sign-up', signUp).get('/account', getUserInfo);

export default router;
