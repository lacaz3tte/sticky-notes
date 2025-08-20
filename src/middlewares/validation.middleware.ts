import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { BadRequestException } from '../exceptions';

export function validate(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      throw new BadRequestException('Validation failed', errors);
    }

    req.body = value;
    next();
  };
}