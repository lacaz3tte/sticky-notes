import { Router } from 'express';
import tagController from '../controllers/tag.controller';
import { validate } from '../middlewares/validation.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createTagSchema, updateTagSchema } from '../dtos/tag.dto';

const router = Router();

router.use(authMiddleware);

router.get('/', tagController.getAll);

router.get('/:id', tagController.getById);

router.post('/', validate(createTagSchema), tagController.create);

router.put('/:id', validate(updateTagSchema), tagController.update);

router.delete('/:id', tagController.delete);

router.get('/:id/sticky-notes', tagController.getStickyNotesByTag);

export default router;