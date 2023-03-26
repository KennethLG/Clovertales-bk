import { Entity } from "./entity";

export class Gallery extends Entity {
  image: string;
  order: number;

  constructor() {
    super();
  }

  update(data: Partial<Gallery>): void {
    super.update(data);
    if (data.image !== undefined) this.image = data.image;
    if (data.order !== undefined) this.order = data.order;
  }
}
