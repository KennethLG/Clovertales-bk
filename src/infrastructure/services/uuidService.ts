import { IUUIDService } from "src/domain/services/uuidService";
import { v4 as uuidv4 } from "uuid";

export class UUIDService implements IUUIDService {
  generateId() {
    return uuidv4();
  }
}
