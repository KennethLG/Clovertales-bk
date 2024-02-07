import { DbClient } from "src/domain/repositories/dbClient";

export class DbClientWrapper<T> implements DbClient<T> {
  constructor(protected dbClient: DbClient<T>) {}

  async create(item: T): Promise<T> {
    return await this.dbClient.create(item);
  }

  async get(id: string): Promise<T | undefined> {
    return await this.dbClient.get(id);
  }

  async getAll(): Promise<T[]> {
    return await this.dbClient.getAll();
  }

  async delete(id: string): Promise<void> {
    await this.dbClient.delete(id);
  }

  async update(id: string, updateData: Omit<T, "id">): Promise<T | undefined> {
    return await this.dbClient.update(id, updateData);
  }
}
