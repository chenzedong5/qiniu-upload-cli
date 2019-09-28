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