import patchAsar from "../source/index.js";
import * as childProcess from "child_process";
import { promisify } from "util";
import { rimraf } from "rimraf";
import mkdirp from "mkdirp-promise";
import { join } from "path";

const tempDir = join(import.meta.dirname, "temp");
const examplePatchFolder = join(import.meta.dirname, "examplePatchFolder");
const examplePackedUnpatched = join(tempDir, "examplePackedUnpatched.asar");
const examplePackedPatched = join(tempDir, "examplePackedPatched.asar");
const finalOutputUnpacked = join(tempDir, "finalOutputUnpacked");
await rimraf(tempDir);
await mkdirp(tempDir);
await mkdirp(finalOutputUnpacked);

const exec = promisify(childProcess.exec);

await exec(
  `asar pack ${join(
    import.meta.dirname,
    "exampleUnpackedProject"
  )} ${examplePackedUnpatched}`
);

await patchAsar(examplePackedUnpatched, examplePatchFolder, {
  outputFile: examplePackedPatched,
});
await exec(`asar extract ${examplePackedPatched} ${finalOutputUnpacked}`);
