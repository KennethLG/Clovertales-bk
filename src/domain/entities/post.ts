export class Post {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  available: boolean;

  constructor() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}
