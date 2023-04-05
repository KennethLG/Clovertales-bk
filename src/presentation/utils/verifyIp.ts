import config from "src/config";

export const verifyIp = (ip: string) => {
  console.log("ip: ", ip, "config: ", config.allowedIp);
  return ip === config.allowedIp;
}