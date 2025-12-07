import { HttpError } from '../helpers/HttpError.js';

const isEmptyBody = (req, res, next) => {
    const { length } = Object.keys(req.body); 

    if(!length) { 
        next(HttpError(400, 'There are no fields in the body'));
    }
    next();
}

export default isEmptyBody;
