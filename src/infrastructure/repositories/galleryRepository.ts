import { Gallery } from "src/domain/entities/gallery";
import DbClient from "src/domain/repositories/dbClient";
import GalleryRepository from "src/domain/repositories/galleryRepository";

export default class GalleryRepositoryImpl implements GalleryRepository {
  private dbClient: DbClient<Gallery>;
  constructor(db: DbClient<Gallery>) {
    this.dbClient = db;
  }
  
  async create(gallery: Gallery): Promise<Gallery> {
    return await this.dbClient.create(gallery);
  }

  async get(id: string): Promise<Gallery | undefined> {
    return await this.dbClient.get(id);
  }

  async getAll(): Promise<Gallery[]> {
    return await this.dbClient.getAll();
  }

  async delete(id: string): Promise<void> {
    await this.dbClient.delete(id);
  }

}