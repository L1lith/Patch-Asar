import { stat } from "fs/promises";

export default async function isFile(path) {
  return (await stat(path)).isFile();
}
