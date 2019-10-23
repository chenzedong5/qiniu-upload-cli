const fs = require("fs")
const path = require("path")

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
      bucket: "",
      zone: "",
      keyPre: "",
      persistentPipeline: ""
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

exports.handlePloy = (config, file) => {
  const extra = path.extname(file)
  switch (extra) {
    case ".jpg":
    case ".png":
    case ".jpeg":
    case ".gif":
      return ``;
    default:
      return ``
  }

  // return `vframe/jpg/offset/0/w/480/h/360${Qiniu.saveas(config.bucket,"")};avthumb/mp4/vcodec/libx264/s/720x576/vb/700k${qiniuControl.saveas()}`
}