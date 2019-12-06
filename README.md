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
