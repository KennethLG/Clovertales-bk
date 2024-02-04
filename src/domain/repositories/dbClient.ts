import { User } from "../entities/user";

export abstract class DbClient<T> {
  abstract create(item: T): Promise<T>;
  abstract get(id: string): Promise<T | undefined>;
  abstract getAll(
    limit?: number,
    startKey?: string
  ): Promise<{ items: T[]; lastEvaluatedKey?: string | undefined }>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, updateData: Partial<T>): Promise<T | undefined>;
}

export abstract class IUserRepository extends DbClient<User> {
  abstract getByEmail(email: string): Promise<User | undefined>;
}
