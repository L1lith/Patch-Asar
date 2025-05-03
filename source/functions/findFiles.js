import { join, extname, basename } from "path";
import { readdir, stat } from "fs/promises";

export default async function findFiles(directory, ...args) {
  let options = {},
    filterFunction = null;
  if (args.length > 2) {
    throw new Error("Too many args!");
  } else if (args.length > 1) {
    filterFunction = args[0];
    options = args[1];
  } else if (args.length > 0) {
    if (typeof args[0] == "function") {
      filterFunction = args[0];
    } else if (typeof args[0] == "object") {
      options = args[0];
    } else {
      throw new Error("Invalid Second Argument");
    }
  }
  if (typeof options != "object")
    throw new Error("Options must be an object or null");
  const { deep = true, matchFolders = true, matchFiles = true } = options || {}; // coerce null;
  if (filterFunction !== null && typeof filterFunction != "function")
    throw new Error("Filter function must be a function or null");
  // End input processing
  const files = await readdir(directory);
  let output = [];

  for (const fileName of files) {
    const filePath = join(directory, fileName);
    const stats = await stat(filePath);
    const isDir = stats.isDirectory();
    const data = { fileName, directory, filePath, stats };
    if (isDir && deep) {
      output = output.concat(
        await findFilesByExtension(filePath, extensions, options)
      );
    }
    if (
      isDir
        ? matchFolders
        : matchFiles && (filterFunction === null || filterFunction(data))
    ) {
      output.push(data);
    }
  }
  return output;
}
