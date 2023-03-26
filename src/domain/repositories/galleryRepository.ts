import { Gallery } from "../entities/gallery";

export default interface GalleryRepository {
  create: (gallery: Gallery) => Promise<Gallery>;
  getAll: () => Promise<Gallery[]>;
  // get: (id: string) => Promise<Gallery | undefined>;
  // delete: (id: string) => Promise<void>;
  // update: (
  //   id: string,
  //   updateData: Partial<Gallery>
  // ) => Promise<Gallery | undefined>;
}
