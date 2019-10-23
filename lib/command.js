const program = require('commander');
const ora = require('ora')
const debug = require("debug")("qiniu");
const uploadToQiniu = require("./upload");
const {
  BASE_PATH
} = require("./config")
const {
  getConfig,
  writeConfig,
  beautify,
  handlePloy
} = require("./writeConfig")
const step = require("./inquirerHander")
const Qiniu = require("./qiniuHandle")
const config = getConfig(BASE_PATH)

program
  .command('upload')
  .alias('up')
  .description('上传资源到七牛云')
  .option("[file]", "要上传的文件路径")
  .option("-f, --file <file>", "要上传的文件路径")
  .action(function (dir) {
    const spinner = ora('uploading...').start();
    if (dir.file || typeof dir === "string") {

      //第二个参数配置上传策略
      const fops = handlePloy(config, dir.file || dir)
      const persistentOps = {}
      if (fops) {
        persistentOps = {
          persistentOps: fops
        }
      }
      uploadToQiniu(dir.file || dir, {
        uploadConfig: {
          ...persistentOps,
          returnBody: `{"key":"$(key)","fsize":"$(fsize)","fsize":"$(fsize)","mimeType":"$(mimeType)"}`
        }
      }).then(ret => {
        spinner.succeed("上传成功")
        // let query = ""
        // if (dir.width || dir.height) {
        // }
        // ret.key && (ret.key = ret.key + query)
        console.log(beautify(ret))
      }).catch(er => {
        debug(er)
        spinner.fail("上传失败" + (er.message ? `，原因：${er.message}` : ""))
        process.exit(1)
      })
    } else {
      spinner.fail("请指定需要上传的文件路径")
    }
  });


program
  .command('config')
  .description('配置七牛文件')
  .option("-s, --set [写入文件]", "配置七牛上传所需要的信息")
  .option("-g, --get [获取配置文件]", "获取七牛上传所需要的信息")
  .action(function (dir) {
    if (dir.get) {
      console.log(beautify(config))
      return
    }
    if (dir.set) {
      step({
        continnue: true
      }, (err, anw) => {
        if (err) {
          console.log((er.message ? `，失败：${er.message}` : err))
          return
        }
        if (anw) {
          writeConfig(BASE_PATH, anw.key, anw.value)
        } else {
          console.log(beautify(config))
        }
      })
      return
    }
    console.log(beautify(config))
  });



program.parse(process.argv);