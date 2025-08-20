import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions';

export function errorMiddleware(
  error: HttpException | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof HttpException) {
    res.status(error.status).json({
      error: {
        message: error.message,
        details: error.details,
        timestamp: new Date().toISOString()
      }
    });
  } else {
    // Непредвиденные ошибки
    console.error('Unexpected error:', error);
    res.status(500).json({
      error: {
        message: 'Internal Server Error',
        timestamp: new Date().toISOString()
      }
    });
  }
}