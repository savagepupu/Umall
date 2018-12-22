// node符合common规范
//输出一个对象
module.exports = {
  userName : "zcf",
  saySomeThing(){
    return "hello Node"
  }
}

// 下面这种方式直接将属性与方法暴露
// exports.userName = "zcfGod"
// exports.saySomeThing = function () {
//   return "hello Node"
// }
