import { Request, Response, NextFunction } from 'express';
import tagService from '../services/tag.service';
import { CreateTagDto, UpdateTagDto } from '../dtos/tag.dto';
import { UserRequest } from '../interfaces/user-request.interface';

class TagController {
  async getAll(req: UserRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      
      const tags = await tagService.getAllTags(req.user.id);
      res.json(tags);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: UserRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      
      const tag = await tagService.getTagById(req.params.id, req.user.id);
      res.json(tag);
    } catch (error) {
      next(error);
    }
  }

  async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      
      const data: CreateTagDto = req.body;
      const tag = await tagService.createTag(data, req.user.id);
      res.status(201).json(tag);
    } catch (error) {
      next(error);
    }
  }

  async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      
      const data: UpdateTagDto = req.body;
      const tag = await tagService.updateTag(req.params.id, data, req.user.id);
      res.json(tag);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      
      await tagService.deleteTag(req.params.id, req.user.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getStickyNotesByTag(req: UserRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      
      const notes = await tagService.getStickyNotesByTag(req.params.id, req.user.id);
      res.json(notes);
    } catch (error) {
      next(error);
    }
  }
}

export default new TagController();