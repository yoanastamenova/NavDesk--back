import {Request, Response , NextFunction} from 'express';
import jwt from "jsonwebtoken";
import { TokenDecoded } from '../types';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.headers.authorization){
            return res.status(400).json(
                {
                    success: false,
                    message: "Unathorized access!"
                }
            )
        }

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenDecoded;
        req.tokenData = {
            id: decoded.id,
            role_id: decoded.role_id,
            email: decoded.email
        }
        next();
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error authenticating user",
                error: error
            }
        )
    }
}
