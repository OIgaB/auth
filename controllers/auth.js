import bcrypt from 'bcrypt';

import { User } from '../models/user.js';
import { HttpError } from '../helpers/HttpError.js';
import { ctrlWrapper } from '../decorators/index.js';

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
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request. Occurs if the request body is empty or fails schema validation (e.g., password < 6 chars, invalid email).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Not Found. The requested endpoint does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Conflict (email already in use).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 *       500:
 *         description: Internal Server Error. Generic error handler fallback.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

const register = async(req, res) => {
  console.info('req.body: ', req.body)
    const { email, password } = req.body;

    const user = await User.findOne({email}); 
    if(user) {
        throw HttpError(409, 'Email already in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashPassword})
    
    res.status(201).json({
        user: {
            email: newUser.email,
        }
    })
};

export default {
    register: ctrlWrapper(register),
}