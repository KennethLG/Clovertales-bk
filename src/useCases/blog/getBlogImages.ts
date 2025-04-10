import { IStorageService } from "src/domain/services/storageService";

export class GetBlogImages {
  constructor(
    private readonly storageService: IStorageService
  ) {}

  async execute() {
    const images = await this.storageService.getItems("resources/blog");
    console.log(images)
    return images;
  }
}
