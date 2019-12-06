const {stat} = require('fs')

function isDirectory(path) {
  return new Promise((resolve, reject) => {
    stat(path, (err, stats) => {
      if (err) return resolve(false)
      resolve(stats.isDirectory())
    })
  })
}

module.exports = isDirectory
