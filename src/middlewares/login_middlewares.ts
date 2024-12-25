import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/interface.utils";
import { showResponse } from "../utils/response.utils";

export const verifyUserToken = async (req: Request, res: Response, next: NextFunction): Promise<ApiResponse | any> => {
    try {

        let token: any = req.headers['access_token'] || req.headers['authorization'] || req.headers['Authorization'];

        if (!token) {
            return res.status(500).json({ success: false, message: 'Token is not provided', data: null });
        }

        // Remove "Bearer " prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trim();
        }

        jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET_KEY}`, (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({ success: false, message: "Auth failed", error: err.message });
            }
            req.body.userId = decoded._id; //we can apply check here for user role
            next(); // Proceed to the next middleware
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};

export const verifyAdminToken = async (req: Request, res: Response, next: NextFunction): Promise<ApiResponse | any> => {
    try {

        let token: any = req.headers['access_token'] || req.headers['authorization'] || req.headers['Authorization'];

        if (!token) {
            return res.status(500).json({ success: false, message: 'Token is not provided', data: null });
        }

        // Remove "Bearer " prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trim();
        }

        jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET_KEY}`, (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({ success: false, message: "Auth failed", error: err.message });
            }
            req.body.userId = decoded._id;
            next(); // Proceed to the next middleware
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};
