import { Gallery } from "src/domain/entities/gallery";
import { DbClient } from "src/domain/repositories/dbClient";
import GalleryRepository from "src/domain/repositories/galleryRepository";
import { DbClientWrapper } from "../common/dbClientWrapper";

export default class GalleryRepositoryImpl
  extends DbClientWrapper<Gallery>
  implements GalleryRepository
{
  constructor(db: DbClient<Gallery>) {
    super(db);
  }
}
