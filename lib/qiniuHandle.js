const qiniu = require("qiniu");
const _ = require("lodash")

class Qiniu {

  constructor(config) {
    this.mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey)
    this.scope = config.bucket;
    this.config = new qiniu.conf.Config();
    this.config.zone = config.zone ? qiniu.zone[config.zone] : qiniu.zone.Zone_z1;
    this.keyPre = config.keyPre || "system/";
    this.persistentPipeline = config.persistentPipeline || ""
  }

  getKey(name) {
    if (!name) {
      name = _.random(10000, 100000);
    }
    return this.keyPre + name
  }

  static saveas(scope, key) {
    return '|saveas/' + qiniu.util.urlsafeBase64Encode(scope + ":" + key);
  }

  upload(uptoken, key, localFile, extra) {
    return new Promise((res, rej) => {

      this.getformUploader().putFile(uptoken, key, localFile, extra, function (err, ret) {
        if (err || ret.error) {
          rej(err || ret.error)
        } else {
          res(ret)
        }

      });
    })
  }

  getUploadToken(options = {}) {
    var putPolicy = new qiniu.rs.PutPolicy({
      ...options,
      scope: this.scope,
      persistentPipeline: this.persistentPipeline
    });
    var uploadToken = putPolicy.uploadToken(this.mac);
    return uploadToken
  }

  getformUploader() {
    return new qiniu.form_up.FormUploader(this.config);
  }

  getputExtra(params = {}) {
    const putExtra = new qiniu.form_up.PutExtra();
    putExtra.params = params
    return putExtra
  }
}

module.exports = Qiniu