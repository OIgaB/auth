import express from 'express';

import { isEmptyBody } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js'
import { schemas } from '../../models/user.js';
import { authCtrl } from '../../controllers/index.js';

const router = express.Router(); 

router.post('/signup', isEmptyBody, validateBody(schemas.registerSchema), authCtrl.register);

export default router; 