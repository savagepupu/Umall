// Node作为客户端请求第三方接口
let http = require('http')
http.get('http://nodejs.cn/node/api_count?v=url.html%23url_url_parse_urlstring_parsequerystring_slashesdenotehost',(res)=>{
  let data = ''
  res.on('data',(chunk)=>{
    data += chunk
  })
  res.on('end',()=>{
    try {
      let result = JSON.parse(data)
      console.log(result)
    }catch(e) {
      console.log(e.message)
    }
  })
})
