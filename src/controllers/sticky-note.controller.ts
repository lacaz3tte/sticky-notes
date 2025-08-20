import { Request, Response, NextFunction } from 'express';
import stickyNoteService from '../services/sticky-note.service';
import { CreateStickyNoteDto, UpdateStickyNoteDto } from '../dtos/sticky-note.dto';

class StickyNoteController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const notes = await stickyNoteService.getAllNotes(req.user.id);
      res.json(notes);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const note = await stickyNoteService.getNoteById(req.params.id, req.user.id);
      res.json(note);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateStickyNoteDto = req.body;
      const note = await stickyNoteService.createNote(data, req.user.id);
      res.status(201).json(note);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data: UpdateStickyNoteDto = req.body;
      const note = await stickyNoteService.updateNote(req.params.id, data, req.user.id);
      res.json(note);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await stickyNoteService.deleteNote(req.params.id, req.user.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new StickyNoteController();