import { rm } from "fs/promises";

export default async function rimraf(path) {
  try {
    await rm(path, { recursive: true });
  } catch (err) {
    if (err.code === "ENOENT") {
      // The directory doesn't exist, do nothing
    } else {
      throw err;
    }
  }
}
