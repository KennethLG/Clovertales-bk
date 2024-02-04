import { DbClient } from "src/domain/repositories/dbClient";

export class DbClientWrapper<T> implements DbClient<T> {
  constructor(protected dbClient: DbClient<T>) {}

  async create(item: T): Promise<T> {
    return await this.dbClient.create(item);
  }

  async get(id: string): Promise<T | undefined> {
    return await this.dbClient.get(id);
  }

  async getAll(
    limit?: number,
    startKey?: string
  ): Promise<{ items: T[]; lastEvaluatedKey?: string | undefined }> {
    return await this.dbClient.getAll(limit, startKey);
  }

  async delete(id: string): Promise<void> {
    await this.dbClient.delete(id);
  }

  async update(id: string, updateData: Partial<T>): Promise<T | undefined> {
    return await this.dbClient.update(id, updateData);
  }
}
