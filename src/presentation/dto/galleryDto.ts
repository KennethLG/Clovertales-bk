import { Gallery } from "src/domain/entities/gallery";

export type CreateGalleryDto = Pick<Gallery, "image" | "order">;