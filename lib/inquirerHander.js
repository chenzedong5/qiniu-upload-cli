var inquirer = require('inquirer');
const {
  getConfig
} = require("./writeConfig")
const {
  BASE_PATH
} = require("./config")

const step = (answers, cb) => {
  if (!answers.continnue) {
    cb(null)
    return
  }
  inquirer
    .prompt([{
      type: 'list',
      name: 'key',
      message: '修改七牛配置信息',
      choices: Object.keys(getConfig(BASE_PATH)),
    }, {
      type: 'input',
      name: 'value',
      default: (keys) => {
        return getConfig(BASE_PATH)[keys.key]
      },
      message: "请输入："
    }, {
      type: 'confirm',
      message: '继续修改',
      name: 'continnue',
    }, ])
    .then(answers => {
      cb(null, answers)
      step(answers, cb)
    }).catch(er => {
      cb(er)
    });
}

module.exports = step