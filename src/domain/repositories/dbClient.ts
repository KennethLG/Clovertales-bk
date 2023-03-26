export default interface DbClient<T> {
  // findById(id: string): Promise<T | null>;
  create(item: T): Promise<T>;
  get(id: string): Promise<T | undefined>;
  getAll(): Promise<T[]>;
  delete(id: string): Promise<void>;
  update(id: string, updateData: Partial<T>): Promise<T | undefined>;
}
