import config from "src/config";

export const verifyIp = (ip: string) => {
  return ip === config.allowedIp;
}