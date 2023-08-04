# Patch Asar
Using this library you can inject your own files into .asar archives.

### Basic Usage
```js
const patchAsar = require('patch-asar')
const path = require('path')

const inputAsar = path.join(__dirname, "input.asar")
const patchFolder = path.join(__dirname, "patches")

patchAsar(inputAsar, patchFolder).then(()=>{
	console.log("Successfully Patched .asar archive in place")
}).catch(error => {
	console.log(error)
})
```

### Passing Additional Options
You can supply an object as the third argument to supply additional options.
```js
...
await patchAsar(inputAsar, patchFolder, {outputFile: path.join(__dirname, 'output.asar')})
...
```

#### Available Options
##### outputFile
The output .asar file path. If this option is not provided it will overwrite the original .asar file.
##### workingDirectory
Allows you to specify the directory you would like the library to work in

### .patch-execute files
A file ending in .patch-execute will be evaluated as Javascript in order to generate it's contents. The .patch-execute extension will be removed automatically during the build process. It should either export a string, or a function returning a string, or a promise returning a string. If you return a function while theres another file with the same name except without .patch-execute then the contents of the file will be passed in as a string input to your function. This can be very useful in order to generate the contents of the patched file based on the contents of the unpatched file and the code you provide in your .patch-execute file.

### Command-line Interface

This library also provides a command-line executable alongside this package.

To use the CLI, install this package globally (e.g. using `npm install -g`). Then run:

```shell
patch-asar IN.asar PATCHDIR OUT.asar
```

The output .asar file is optional; omit it in order to overwrite the input .asar file:

```shell
patch-asar IN.asar PATCHDIR
```
