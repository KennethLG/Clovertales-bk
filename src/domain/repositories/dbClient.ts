export default interface DbClient<T> {
  // findById(id: string): Promise<T | null>;
  create(item: T): Promise<T>;
}
