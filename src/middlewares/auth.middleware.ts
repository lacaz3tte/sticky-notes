// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';
import { UnauthorizedException } from '../exceptions';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException('No token provided');
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = authService.verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    throw new UnauthorizedException('Invalid token');
  }
}