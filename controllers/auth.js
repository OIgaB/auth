import bcrypt from 'bcrypt';

import { User } from '../models/user.js';
import { HttpError } from '../helpers/HttpError.js';
import { ctrlWrapper } from '../decorators/index.js';

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