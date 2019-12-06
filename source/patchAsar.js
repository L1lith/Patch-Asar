const isDirectory = require('./functions/isDirectory')
const isFile = require('./functions/isFile')
const {promisify} = require('util')
const rimraf = promisify(require('rimraf'))
const mkdirp = require('mkdirp-promise')
const asar = require('asar')
const copydir = promisify(require('copy-dir'))
const {basename, extname, join} = require('path')

async function patchAsar(asarFilePath, patchFolderPatch, options={}) {
  if (typeof options != 'object') throw new Error("Options must be an object or null.")
  let {outputPath=null, workingDirectory=null} = options || {}
  if (typeof asarFilePath != 'string' || !asarFilePath.endsWith('.asar') || !(await isFile(asarFilePath))) throw new Error("Invalid Asar File Path")
  if (typeof patchFolderPatch != 'string' || !(await isDirectory(patchFolderPatch))) throw new Error("Invalid Patch Folder Path")
  if (outputPath !== null && (typeof outputPath != 'string' || await isDirectory(outputPath))) throw new Error("Invalid Output File Path")
  if (workingDirectory !== null && (typeof workingDirectory != 'string')) throw new Error("Invalid Working Directory Path")
  if (outputPath === null) outputPath = asarFilePath // Patch in place
  if (workingDirectory === null) workingDirectory = join(__dirname, './build/')
  workingDirectory = join(workingDirectory, basename(asarFilePath, extname(asarFilePath)))
  await rimraf(workingDirectory)
  await mkdirp(workingDirectory)
  await asar.extractAll(asarFilePath, workingDirectory)
  await copydir(patchFolderPatch, workingDirectory)
  await rimraf(outputPath)
  await await asar.createPackage(workingDirectory, outputPath)
}

module.exports = patchAsar
