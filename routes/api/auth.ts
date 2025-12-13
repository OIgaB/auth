import express from "express";

import { authCtrl } from "../../controllers/index.js";
import { validateBody } from "../../decorators/index.js";
import { authenticate, isEmptyBody } from "../../middlewares/index.js";
import { schemas } from "../../models/user.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints for user registration and login
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthBody'
 *     responses:
 *       201:
 *         description: Registration successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/SignupSuccessResponse'
 *       400:
 *         description: Bad Request — empty body or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       409:
 *         description: Conflict — email already in use.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConflictErrorResponse'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Authenticate a user and return a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthBody'
 *     responses:
 *       200:
 *         description: Login successful. Returns a JWT token and user info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SigninSuccessResponse'
 *       400:
 *         description: Bad Request — validation error or missing fields.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Unauthorized — wrong email or password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *             examples:
 *               wrongCredentials:
 *                 value:
 *                   statusCode: 401
 *                   message: "Email or password is wrong"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */

/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     summary: Sign out the current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Successfully signed out. No content returned.
 *       401:
 *         description: Unauthorized — invalid or missing token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *             examples:
 *               invalidToken:
 *                 value:
 *                   statusCode: 401
 *                   message: "Invalid or missing token"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */

router.post(
  "/signup",
  isEmptyBody,
  validateBody(schemas.registerSchema),
  authCtrl.register
);
router.post(
  "/signin",
  isEmptyBody,
  validateBody(schemas.signInSchema),
  authCtrl.signIn
);
router.post("/signout", authenticate, authCtrl.signOut);
router.get('/current', authenticate, authCtrl.getCurrent);

export default router;
