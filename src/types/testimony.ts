export interface Testimony {
  id: string;
  content: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string; // We'll use this later when we add authentication
  category: string; // Adding category support
  tags: string[]; // Adding tags support
} 