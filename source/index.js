const patchAsar = require('./patchAsar')


module.exports = Object.assign((...args)=>(patchAsar(...args)), {patchAsar})
