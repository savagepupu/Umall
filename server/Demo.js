//Node支持ES6语法
let user = require('./User.js')
console.log(`${user.userName}` + 'say:' + `${user.saySomeThing()}`)

let http = require('http')
let url = require('url')
//util调试url
let util = require('util')

let server = http.createServer(function (req,res) {
  res.statusCode = 200
  res.setHeader("Content-Type","text/plain; charset=utf-8")
  //转换为字符串进行输出
  res.end(util.inspect(url.parse(req.url)))
})

server.listen(8081,'127.0.0.1',function () {
  console.log('服务已启动，输入127.0.0.1:8081进行访问')
})

