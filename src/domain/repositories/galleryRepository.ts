import { Gallery } from "../entities/gallery";

export default interface GalleryRepository {
  create: (gallery: Gallery) => Promise<Gallery>;
  getAll: () => Promise<Gallery[]>;
  delete: (id: string) => Promise<void>;
  get: (id: string) => Promise<Gallery | undefined>;
}
