import Joi from 'joi';

export const createTagSchema = Joi.object({
  name: Joi.string().max(255).required().messages({
    'string.max': 'Name must be less than 255 characters',
    'any.required': 'Name is required',
    'string.empty': 'Name cannot be empty'
  }),
  color: Joi.string()
    .pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .default('#cccccc')
    .messages({
      'string.pattern.base': 'Color must be a valid hex color code'
    })
});

export const updateTagSchema = Joi.object({
  name: Joi.string().max(255).messages({
    'string.max': 'Name must be less than 255 characters',
    'string.empty': 'Name cannot be empty'
  }),
  color: Joi.string()
    .pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .messages({
      'string.pattern.base': 'Color must be a valid hex color code'
    })
});

export interface CreateTagDto {
  name: string;
  color?: string;
}

export interface UpdateTagDto {
  name?: string;
  color?: string;
}