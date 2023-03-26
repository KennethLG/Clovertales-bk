import { v4 as uuidv4 } from "uuid";

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
    this.id = uuidv4();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static fromData(data: Partial<Post>): Post {
    const post = new Post();
    post.id = data.id || uuidv4();
    post.title = data.title || "";
    post.description = data.description || "";
    post.content = data.content || "";
    post.imageUrl = data.imageUrl || "";
    post.createdAt = data.createdAt || new Date().toISOString();
    post.updatedAt = data.updatedAt || new Date().toISOString();
    post.available = data.available ?? true;
    return post;
  }

  update(data: Partial<Post>): void {
    if (data.title !== undefined) this.title = data.title;
    if (data.description !== undefined) this.description = data.description;
    if (data.content !== undefined) this.content = data.content;
    if (data.imageUrl !== undefined) this.imageUrl = data.imageUrl;
    if (data.available !== undefined) this.available = data.available;
    this.updatedAt = new Date().toISOString();
  }
}