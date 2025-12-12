import { Request, Response, NextFunction } from "express";

import { HttpError } from '../helpers/HttpError.js';

const isEmptyBody = (req: Request, res: Response, next: NextFunction) => {
    const { length } = Object.keys(req.body); 

    if(!length) { 
        next(HttpError(400, 'There are no fields in the body'));
    }
    next();
}

export default isEmptyBody;
