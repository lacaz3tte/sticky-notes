// src/interfaces/user-request.interface.ts
import { Request } from 'express';

export interface UserRequest extends Request {
  user?: {
    id: string;
    email?: string;
    isPro?: boolean;
  };
}