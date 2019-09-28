var inquirer = require('inquirer');
const {
  BASE_PATH
} = require("./config")
const {
  getConfig
} = require("./writeConfig")

const config = getConfig(BASE_PATH)


const step = (answers, cb) => {
  if (!answers.continnue) {
    console.log(config)
    return
  }
  inquirer
    .prompt([{
      type: 'list',
      name: 'key',
      message: '修改七牛配置信息',
      choices: Object.keys(config),
    }, {
      type: 'input',
      name: 'value',
      message: "请输入："
    }, {
      type: 'confirm',
      message: '继续修改',
      name: 'continnue',
    }, ])
    .then(answers => {
      cb(answers)
      step(answers, cb)
    }).catch(er => {
      console.log(er)
    });
}

module.exports = step