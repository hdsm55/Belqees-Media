// Common Types
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'CONTRIBUTOR' | 'VIEWER';
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Page Types
export interface Page {
  id: string;
  slug: string;
  title: string;
  content?: Record<string, unknown>;
  blocks?: Block[];
  seo?: SEO;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Block {
  type: string;
  data: Record<string, unknown>;
}

export interface SEO {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

// Service Types
export interface Service {
  id: string;
  slug: string;
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  content?: Record<string, unknown>;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

