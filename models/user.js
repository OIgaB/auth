import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { validateAtUpdate} from '../middlewares/index.js'
import { handleMongooseError } from '../middlewares/index.js';

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailMessage = 'Sorry, the provided email address is not valid. Please ensure it follows the correct format. Examples of valid email addresses: john.doe@example.com, jane_doe123@example.co.uk, user123@example-domain.com';

const userSchema = new Schema({
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
}, { versionKey: false, timestamps: true });

userSchema.pre("findOneAndUpdate", validateAtUpdate);
userSchema.post('save', handleMongooseError);
userSchema.post('findOneAndUpdate', handleMongooseError);

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegExp).message(emailMessage).required(),
    password: Joi.string().min(6).message('Ensure your password contains at least 6 symbols').required(),
});

export const schemas = {
    registerSchema,
};

export const User = model('user', userSchema);
