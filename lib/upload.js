const Qiniu = require("./qiniuHandle")
const path = require("path");
const {
  BASE_PATH
} = require("./config")
const {
  getConfig
} = require("./writeConfig");

const {
  accessKey,
  secretKey,
  bucket
} = getConfig(BASE_PATH)

async function upload(paths, option = {}) {
  let qiniu = new Qiniu({
    accessKey,
    secretKey,
    bucket
  })
  let key = qiniu.getKey(path.basename(paths))

  let result = await qiniu.upload(qiniu.getUploadToken(option.uploadConfig), key, paths, qiniu.getputExtra())
  return result
}

module.exports = upload