import { promisify } from "util";
import { dirname, basename, extname, join, relative } from "path";
import { writeFile, readFile } from "fs/promises";
import findFiles from "./functions/findFiles.js";
import rimraf from "./functions/rimraf.js";

async function executePatches(workingFolder, patchFolder) {
  // const patchesToExecute = await new Promise((res) => {
  //   find.file(/.patch-execute$/, patchFolder, (files) => res(files));
  // });
  const patchesToExecute = await findFiles(patchFolder, (file) =>
    file.fileName.endsWith(".patch-execute")
  );
  await Promise.all(
    patchesToExecute.map(async (patch) => {
      const postExecute = join(
        workingFolder,
        relative(patchFolder, dirname(patch)),
        basename(patch, extname(patch))
      );
      const patchToDelete = postExecute + ".patch-execute";
      let output;
      try {
        output = await import(patch);
      } catch (error) {
        error.message =
          "The following error occured while trying to require a .patch-execute file:\n" +
          error.message;
        throw error;
      }
      let input = null;
      if (typeof output == "function") {
        try {
          input = await readFile(postExecute, "utf8");
        } catch (err) {
          if (err.code === "ENOENT") {
            // There is no input file, do nothing
          } else {
            throw err;
          }
        }
        output = output(input);
      }
      if (output instanceof Promise) output = await output;
      if (typeof output != "string" && output !== null)
        throw new Error("The file did not output null or a string");
      if (typeof output == "string") {
        await rimraf(postExecute);
        await writeFile(postExecute, output);
      }
      await rimraf(patchToDelete);
    })
  );
}

export default executePatches;
