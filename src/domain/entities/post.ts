import { Entity } from "./entity";

export class Post extends Entity {
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  available: boolean;

  constructor() {
    super();
  }

  update(data: Partial<Post>): void {
    super.update(data);
    if (data.title !== undefined) this.title = data.title;
    if (data.description !== undefined) this.description = data.description;
    if (data.content !== undefined) this.content = data.content;
    if (data.imageUrl !== undefined) this.imageUrl = data.imageUrl;
    if (data.available !== undefined) this.available = data.available;
  }
}