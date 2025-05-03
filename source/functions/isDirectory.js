import { stat } from "fs/promises";

export default async function isDirectory(path) {
  return (await stat(path)).isDirectory();
}
