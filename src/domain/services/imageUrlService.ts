export abstract class IImageUrlService {
  abstract buildKey(id: string, extension: string, basePath: string): string;
}
