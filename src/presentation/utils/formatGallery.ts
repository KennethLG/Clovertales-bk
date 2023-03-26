import config from "src/config";
import { Gallery } from "src/domain/entities/gallery";

export const formatGallery = (gallery: Gallery[], path: string) => {
  return gallery.map((gallery) => ({
    ...gallery,
    url: `${config.aws.cdn}${path}/${gallery.id}.${gallery.extension}`,
  }));
};
