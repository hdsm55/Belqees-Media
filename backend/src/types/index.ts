import { Request } from 'express';
import { UserRole } from '@prisma/client';

// Extended Request with user
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

// JWT Payload
export interface JWTPayload {
  id: string;
  email: string;
  role: UserRole;
}

// API Response
export interface ApiResponse<T = unknown> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

