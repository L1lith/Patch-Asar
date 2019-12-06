const {stat} = require('fs')

function isFile(path) {
  return new Promise((resolve, reject) => {
    stat(path, (err, stats) => {
      if (err) return resolve(false)
      resolve(stats.isFile())
    })
  })
}

module.exports = isFile
