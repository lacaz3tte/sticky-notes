import Joi from 'joi';

export const createStickyNoteSchema = Joi.object({
  text: Joi.string().max(500).required().messages({
    'string.max': 'Text must be less than 500 characters',
    'any.required': 'Text is required'
  }),
  positionX: Joi.number().integer().default(0),
  positionY: Joi.number().integer().default(0),
  zIndex: Joi.number().integer().default(0),
  color: Joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).default('#ffff88'),
  tagIds: Joi.array().items(Joi.string().uuid()).default([])
});

export const updateStickyNoteSchema = Joi.object({
  text: Joi.string().max(500),
  positionX: Joi.number().integer(),
  positionY: Joi.number().integer(),
  zIndex: Joi.number().integer(),
  color: Joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  tagIds: Joi.array().items(Joi.string().uuid())
});

export const moveStickyNoteSchema = Joi.object({
  position: Joi.string().valid('front', 'back', 'before', 'after').required(),
  targetNoteId: Joi.string().uuid().when('position', {
    is: Joi.valid('before', 'after'),
    then: Joi.required(),
    otherwise: Joi.optional()
  })
});

export interface CreateStickyNoteDto {
  text: string;
  positionX?: number;
  positionY?: number;
  zIndex?: number;
  color?: string;
  tagIds?: string[];
}

export interface UpdateStickyNoteDto {
  text?: string;
  positionX?: number;
  positionY?: number;
  zIndex?: number;
  color?: string;
  tagIds?: string[];
}

export interface MoveStickyNoteDto {
  position: 'front' | 'back' | 'before' | 'after';
  targetNoteId?: string;
}