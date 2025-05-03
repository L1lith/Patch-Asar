import { stat } from "fs/promises";

export default async function isDirectory(path) {
  try {
    return (await stat(path)).isDirectory();
  } catch (err) {
    if (err.code === "ENOENT") {
      // The directory doesn't exist
      return false;
    } else {
      throw err;
    }
  }
}
