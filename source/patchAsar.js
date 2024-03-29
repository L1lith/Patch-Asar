const isDirectory = require('./functions/isDirectory')
const isFile = require('./functions/isFile')
const {promisify} = require('util')
const rimraf = promisify(require('rimraf'))
const mkdirp = require('mkdirp-promise')
const asar = require('asar')
const copydir = promisify(require('copy-dir'))
const {basename, extname, join} = require('path')
const executePatches = require('./executePatches')

async function patchAsar(asarFilePath, patchFolderPath, options={}) {
  if (typeof options != 'object') throw new Error("Options must be an object or null.")
  let {workingDirectory=null, keepWorkingDirectory=false} = options || {}
  let outputPath = options.outputPath || options.outputFile || null
  if (typeof keepWorkingDirectory != 'boolean') throw new Error("keepWorkingDirectory must be a boolean")
  if (typeof asarFilePath != 'string' || !asarFilePath.endsWith('.asar') || !(await isFile(asarFilePath))) throw new Error("Invalid Asar File Path")
  if (typeof patchFolderPath != 'string' || !(await isDirectory(patchFolderPath))) throw new Error("Invalid Patch Folder Path")
  if (outputPath !== null && (typeof outputPath != 'string' || await isDirectory(outputPath))) throw new Error("Invalid Output File Path")
  if (workingDirectory !== null && (typeof workingDirectory != 'string')) throw new Error("Invalid Working Directory Path")
  if (outputPath === null) outputPath = asarFilePath // Patch in place
  if (workingDirectory === null) workingDirectory = join(__dirname, './build/')
  workingDirectory = join(workingDirectory, basename(asarFilePath, extname(asarFilePath)))
  await rimraf(workingDirectory)
  await mkdirp(workingDirectory)
  await asar.extractAll(asarFilePath, workingDirectory)
  await copydir(patchFolderPath, workingDirectory)
  await executePatches(workingDirectory, patchFolderPath)
  await rimraf(outputPath)
  await asar.createPackage(workingDirectory, outputPath)
  if (keepWorkingDirectory === false) await rimraf(workingDirectory)
}

module.exports = patchAsar
