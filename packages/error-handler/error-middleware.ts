import { AppError } from "./index";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        console.log(`Error ${req.method} ${req.url} - ${err.message}`);
        
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
            ...(err.details && { details: err.details })
        });
    }

    console.log('Unhandled error:', err);
    
    // A more descriptive message is often better for unhandled errors
    return res.status(500).json({
        status: "error",
        message: "An unexpected error occurred. Please try again later."
    });
};