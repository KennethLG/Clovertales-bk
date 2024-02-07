export abstract class IStorageService {
  abstract uploadItem(base64Item: string, path: string): Promise<string>;
  abstract deleteItem(key: string): Promise<void>;
}
