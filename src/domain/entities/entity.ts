import { v4 as uuidv4 } from "uuid";

export class Entity {
  id: string;
  createdAt: string;
  updatedAt: string;

  constructor() {
    this.id = uuidv4();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static fromData<T extends Entity>(this: new () => T, data: Partial<T>): T {
    const entity = new this();
    entity.id = data.id || uuidv4();
    entity.createdAt = data.createdAt || new Date().toISOString();
    entity.updatedAt = data.updatedAt || new Date().toISOString();
    return entity;
  }

  update(data: Partial<Entity>): void {
    this.updatedAt = new Date().toISOString();
  }
}
