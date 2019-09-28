const program = require('commander');
const ora = require('ora')
const debug = require("debug")("qiniu");
const uploadToQiniu = require("./upload");
const {
  BASE_PATH
} = require("./config")
const {
  getConfig,
  writeConfig
} = require("./writeConfig")
const step = require("./inquirerHander")


program
  .command('upload')
  .alias('up')
  .description('上传资源到七牛云')
  .option("-f, --file <file>", "要上传的文件路径")
  .action(function (dir) {
    const spinner = ora('uploading...').start();
    if (dir.file) {
      
      //第二个参数配置上传策略
      uploadToQiniu(dir.file, {}).then(ret => {
        spinner.succeed("上传成功")
        console.log(ret)
      }).catch(er => {
        debug(er)
        spinner.fail("上传失败" + (er.message ? `，原因：${er.message}` : ""))
      })
    } else {
      spinner.fail("请选择需要上传的文件路径")
    }
  });


program
  .command('config')
  .description('配置七牛文件')
  .option("-s, --set [写入文件]", "配置七牛上传所需要的信息")
  .option("-g, --get [获取配置文件]", "获取七牛上传所需要的信息")
  .action(function (dir) {
    if (dir.get) {
      console.log(getConfig(BASE_PATH))
    }
    if (dir.set) {
      step({
        continnue: true
      }, (anw) => writeConfig(BASE_PATH, anw.key, anw.value))
    }
  });



program.parse(process.argv);