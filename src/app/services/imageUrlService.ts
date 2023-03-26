export class ImageUrlService {
  constructor(private readonly basePath: string) {}

  buildKey(id: string, extension: string) {
    return `${this.basePath}${id}.${extension}`;
  }
}