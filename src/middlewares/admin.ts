import { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.tokenData || req.tokenData.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied!"
            });
        }
        next();
    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        res.status(500).json({
            success: false,
            message: "Error in checking admin role!",
            error: process.env.NODE_ENV === 'development' ? {
                message: (error as Error).message,  
                stack: (error as Error).stack
            } : undefined
        });
    }
};