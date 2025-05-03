import patchAsar from "../source/index.js";
import * as childProcess from "child_process";
import { promisify } from "util";
import { rimraf } from "rimraf";
import mkdirp from "mkdirp-promise";
import { join } from "path";
import findFiles from "../source/functions/findFiles.js";

const tempDir = join(import.meta.dirname, "temp");
const exampleUnpackedProject = join(
  import.meta.dirname,
  "exampleUnpackedProject"
);
const examplePatchFolder = join(import.meta.dirname, "examplePatchFolder");
const examplePackedUnpatched = join(tempDir, "examplePackedUnpatched.asar");
const examplePackedPatched = join(tempDir, "examplePackedPatched.asar");
const finalOutputUnpacked = join(tempDir, "finalOutputUnpacked");
await rimraf(tempDir);
await mkdirp(tempDir);
await mkdirp(finalOutputUnpacked);

const exec = promisify(childProcess.exec);

await exec(`asar pack ${exampleUnpackedProject} ${examplePackedUnpatched}`);

await patchAsar(examplePackedUnpatched, examplePatchFolder, {
  outputFile: examplePackedPatched,
});
await exec(`asar extract ${examplePackedPatched} ${finalOutputUnpacked}`);

const patchFiles = await findFiles(examplePatchFolder);
const unpackedFiles = await findFiles(exampleUnpackedProject);
const outputFiles = await findFiles(finalOutputUnpacked);
const expectedTotalFiles = patchFiles.length + unpackedFiles.length;

const testPassed = expectedTotalFiles === outputFiles.length;

console.log(
  `\n\nTests ${testPassed ? "Passed :)" : "Failed :("}\n
Expected ${expectedTotalFiles} files, found ${outputFiles.length} files\n
Output Files:\n${outputFiles.map((file) => file.fileName).join("\n")}\n\n`
);

await rimraf(tempDir);
