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

/**
 * @swagger
 * components:
 *   schemas:
 *     UserSuccess:
 *       type: object
 *       required:
 *       - msg
 *       properties:
 *         msg:
 *           type: string
 *           required: true
 *       example:
 *         msg: Some success message
 */

/**
 * @swagger
 * /users/sign-in:
 *   post:
 *     summary: Signs in the user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *             - email
 *             - password
 *
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *             example:
 *               email: "xyz11@gmail.com"
 *               password: "************"
 *
 *     responses:
 *       200:
 *         description: Successfull login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSuccess'
 *       404:
 *         description: Unsuccessfull login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSuccess'
 */

router.post('/sign-in', signIn);

router.post('/sign-up', uploadUserDP, signUp);

router.get('/account-info', authenticateUser, getAccountInfo);

router.get('/log-out', logOut);

router.post('/exists', doesUserExists);

router.get('/authenticate', authenticateUser, authUser);

router.put('/:id', authenticateUser, updateUserInfo);

router.put('/:id/dp', authenticateUser, uploadUserDP, changeDisplayPicture);

export default router;
