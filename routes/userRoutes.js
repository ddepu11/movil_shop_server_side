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
 *             required:
 *             - email
 *             - password
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

/**
 * @swagger
 * /users/sign-up:
 *   post:
 *     summary: Signs up the user
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *             - firstName
 *             - lastName
 *             - phoneNumber
 *             - gender
 *             - email
 *             - password
 *             - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *                 required: true
 *               lastName:
 *                 type: string
 *                 required: true
 *               phoneNumber:
 *                 type: string
 *                 required: true
 *               gender:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *               confirmPassword:
 *                 type: string
 *                 required: true
 *               role:
 *                 type: string
 *               dp:
 *                 type: file
 *                 required: true
 *     responses:
 *       201:
 *         description: Successful sign up
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSuccess'
 *       409:
 *         description: User already registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSuccess'
 *       400:
 *         description: Unsuccessfull sign up
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSuccess'
 */

router.post('/sign-up', uploadUserDP, signUp);

router.get('/account-info', authenticateUser, getAccountInfo);

router.get('/log-out', logOut);

router.post('/exists', doesUserExists);

router.get('/authenticate', authenticateUser, authUser);

router.put('/:id', authenticateUser, updateUserInfo);

router.put('/:id/dp', authenticateUser, uploadUserDP, changeDisplayPicture);

export default router;
