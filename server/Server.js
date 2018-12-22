//该页面创建服务用来加载静态页面
let http = require('http')
let fs = require('fs')
let url = require('url')


let server = http.createServer((req,res)=>{

  let pathName = url.parse(req.url).pathname.substring(1) //对请求的url进行拆分操作,获取文件名

  fs.readFile(pathName,(err,data)=>{
      if(err){
        res.writeHead(404,{
          'Content-Type':'text/html'
        })
      }else {
        res.writeHead(200,{
          'Content-Type':'text/html'
        })
        res.write(data.toString())
      }
    res.end()
  })
})

server.listen(8082,'127.0.0.1',()=>{
  console.log('监听成功,请输入127.0.0.1:8082访问服务')
})
