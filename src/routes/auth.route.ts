import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { loginSchema, registerSchema } from '../dtos/auth.dto';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

export default router;