import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { TokenDecoded } from '../types';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized access - No Authorization header!"
            });
        }

        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized access - Bearer token missing!"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenDecoded;

        req.tokenData = {
            id: decoded.id,
            role: decoded.role
        };
        next();
    } catch (error) {
        console.error('JWT Error:', error);
        res.status(500).json({
            success: false,
            message: "Error authenticating user",
            error: (error as Error).message
        });
    }
};