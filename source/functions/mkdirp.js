import { mkdir } from "fs/promises";
export default async function mkdirp(dirPath) {
  await mkdir(dirPath, { recursive: true });
}
