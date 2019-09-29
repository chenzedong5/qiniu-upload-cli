const fs = require("fs")

exports.writeConfig = (paths, key, value) => {
  let config = require(paths)
  if (typeof config === "object" && config.hasOwnProperty(key)) {
    config[key] = value
  }
  fs.writeFileSync(paths, JSON.stringify(config))
}

exports.getConfig = (paths) => {
  if (!fs.existsSync(paths)) {
    fs.writeFileSync(paths, JSON.stringify({
      accessKey: "",
      secretKey: "",
      bucket: ""
    }))
  }
  return require(paths)
}

exports.beautify = (obj) => {
  let map = {}
  for (let i in obj) {
    map[i] = require("chalk").green(obj[i])
  }
  return JSON.stringify(map, null, 2).replace(/\\/g, '').replace(/u001b/g, '\u001b')
}