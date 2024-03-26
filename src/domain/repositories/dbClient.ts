export abstract class DbClient<T> {
  abstract create(item: T): Promise<T>;
  abstract get(id: string): Promise<T | undefined>;
  abstract getAll(): Promise<T[]>;
  abstract delete(id: string): Promise<void>;
  abstract update(
    id: string,
    updateData: Omit<T, "id">
  ): Promise<T | undefined>;
  abstract getAllPaginated(
    id: string,
    limit?: number,
    startKey?: { id: string; createdAt: string }
  ): Promise<{
    items: T[];
    lastEvaluatedKey?: { id: string; createdAt: string };
  }>;
}
