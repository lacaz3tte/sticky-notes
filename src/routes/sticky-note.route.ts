// src/routes/sticky-note.route.ts
import { Router } from 'express';
import stickyNoteController from '../controllers/sticky-note.controller';
import { validate } from '../middlewares/validation.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createStickyNoteSchema, updateStickyNoteSchema } from '../dtos/sticky-note.dto';

const router = Router();

router.use(authMiddleware); // Защищаем все маршруты

router.get('/', stickyNoteController.getAll);
router.get('/:id', stickyNoteController.getById);
router.post('/', validate(createStickyNoteSchema), stickyNoteController.create);
router.put('/:id', validate(updateStickyNoteSchema), stickyNoteController.update);
router.delete('/:id', stickyNoteController.delete);

export default router;