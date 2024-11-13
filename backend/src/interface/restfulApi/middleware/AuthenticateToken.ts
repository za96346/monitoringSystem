import UserEntity from '../../../domain/entity/UserEntity';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// JWT 驗證中介軟體
function AuthenticateToken(jwtSecretKey: string): ((req: Request, res: Response, next: NextFunction) => void) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (!token) {
            res.status(401).json({ message: 'Token is missing' });
            return
        }
    
        try {
            const payload = jwt.verify(token, jwtSecretKey);
            // (req as unknown as Request & { user: UserEntity }).user = payload;
            (req as unknown as any).pay = payload
            next();
        } catch (error) {
            res.status(403).json({ message: 'Invalid or expired token' });
        }
    }
}

export default AuthenticateToken;
