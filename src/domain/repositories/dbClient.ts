import { Post } from "../entities/post";
import { User } from "../entities/user";

export abstract class DbClient<T> {
  abstract create(item: T): Promise<T>;
  abstract get(id: string): Promise<T | undefined>;
  abstract getAll(): Promise<T[]>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, updateData: Partial<T>): Promise<T | undefined>;
}

export abstract class IUserRepository extends DbClient<User> {
  abstract getByEmail(email: string): Promise<User | undefined>;
}

export abstract class IPostRepository extends DbClient<Post> {
  abstract getAllPaginated(
    limit?: number,
    startKey?: string
  ): Promise<{ items: Post[]; lastEvaluatedKey?: string | undefined }>;
}
