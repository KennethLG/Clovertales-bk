export abstract class IStorageService {
  abstract uploadItem(base64Item: string, path: string): Promise<void>;
  abstract deleteItem(key: string): Promise<void>;
  abstract getItems(prefix: string): Promise<string[]>;
}
