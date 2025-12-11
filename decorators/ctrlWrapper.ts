import { Request, Response, NextFunction } from "express";

export type Controller<T = any, P = any, Q = any> = (
  req: Request<P, {}, T, Q>, 
  res: Response, 
  next: NextFunction
) => Promise<void>;

const ctrlWrapper = (ctrl: Controller): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => { 
    const func = async(req: Request, res: Response, next: NextFunction) => { 
        try {
            await ctrl(req, res, next); 
        } catch(error) {  
            next(error);   
        }
    }
    return func;
}

export default ctrlWrapper;
