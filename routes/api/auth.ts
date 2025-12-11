import express from 'express';

import { isEmptyBody } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js'
import { schemas } from '../../models/user.js';
import { authCtrl } from '../../controllers/index.js';

const router = express.Router(); 

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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Registration successful.    
 *         content:
 *           application/json:    
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Bad Request. Occurs if the request body is empty or fails schema validation (e.g., password < 6 chars, invalid email).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Request body is empty or some field failed validation"
 *       404:
 *         description: Not Found. The requested endpoint does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not Found. The requested endpoint does not exist"
 *       409:
 *         description: Conflict (email already in use).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email already in use"
 *       500:
 *         description: Internal Server Error. Generic error handler fallback.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.post('/signup', isEmptyBody, validateBody(schemas.registerSchema), authCtrl.register);
router.post('/signin', isEmptyBody, validateBody(schemas.signInSchema), authCtrl.signIn);

export default router; 