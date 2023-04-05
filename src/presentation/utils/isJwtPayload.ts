import { JwtPayload } from "jsonwebtoken";

export const isJwtPayload = (obj: any): obj is JwtPayload => {
  return obj && typeof obj === "object" && "ip" in obj;
}