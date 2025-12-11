import { Query } from 'mongoose';
import { NextFunction } from 'express';

interface MongooseQuery extends Query<any, any> {
    options: {
        runValidators?: boolean;
    };
}

const validateAtUpdate = function(this: MongooseQuery, next: NextFunction): void { 
    this.options.runValidators = true; 
    next(); 
}

export default validateAtUpdate;
