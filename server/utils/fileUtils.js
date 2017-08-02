const fs = require('fs')
const path = require('path')

module.exports = {
  upload: function getAvatar (fileName, tmpPath) {
    return new Promise((resolve, reject) => {
      fs.rename(tmpPath, path.join(tmpPath, '../' + fileName), err => {
        if (err) reject(err)
        resolve(`avatar/${fileName}`)
      })
    })
  }
}
