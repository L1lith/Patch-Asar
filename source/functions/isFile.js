import { stat } from "fs/promises";

export default async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch (err) {
    if (err.code === "ENOENT") {
      // The file doesn't exist
      return false;
    } else {
      throw err;
    }
  }
}
