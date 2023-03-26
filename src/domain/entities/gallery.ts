export class Gallery {
  id: string;
  image: string;
  order: number;
  createdAt: string;
  updatedAt: string;

  constructor() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}
