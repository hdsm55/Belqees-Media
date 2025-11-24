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

// Portfolio Types
export interface Portfolio {
  id: string;
  slug: string;
  title: string;
  description?: string;
  images?: string[];
  videos?: string[];
  category?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Event Types
export interface Event {
  id: string;
  slug: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  location?: string;
  image?: string;
  registrations?: Record<string, unknown>;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  categoryId?: string;
  authorId: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
}

export interface Tag {
  id: string;
  slug: string;
  name: string;
}

// Media Types
export interface Media {
  id: string;
  filename: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: string;
  createdAt: string;
}

// Contact Types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Language Types
export type Language = 'ar' | 'en' | 'tr';

