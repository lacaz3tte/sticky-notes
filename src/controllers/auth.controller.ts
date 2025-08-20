import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';
import { validate } from '../middlewares/validation.middleware';
import { loginSchema, registerSchema } from '../dtos/auth.dto';

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await authService.register(req.body);
      res.status(201).json(token);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await authService.login(req.body);
      res.json(token);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();