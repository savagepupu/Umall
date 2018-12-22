let express = require('express')
//通过express框架获取express路由
let router = express.Router()
let Goods = require('../model/goods')
let User = require('../model/users')
let mongoose = require('mongoose')
let http  = require('http')
let url = require('url')
let querystring = require('querystring')

 //链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/db_FullStackMall',{ useNewUrlParser: true })
//监听链接情况
mongoose.connection.on('connected',function () {
  console.log('mongodb connected success')
})

mongoose.connection.on('error',function () {
  console.log('mongodb connected fail')
})

mongoose.connection.on('disconnected',function () {
  console.log('mongodb connected disconnected')
})


// 定义goods/之后的二级路由
//实现一个查询的接口
router.get('/list',function (req,res,next) {
  //分解url
  let args = url.parse(req.url)
  //获取参数
  let arg = args.query
  //反序列化为object对象
  let params = querystring.parse(arg)
  let page = parseInt(params.page)
  let pageSize = parseInt(params.pageSize)
  let sort = parseInt(params.sort)
  let skip = (page-1)*pageSize
  //价格过滤
  let priceLevel = params.priceLevel
  let priceGt= '',priceLte = ''
    if(priceLevel !== 'all'){
      switch (priceLevel){
        case '0':priceGt = 0;priceLte = 1000;break
        case '1':priceGt = 1000;priceLte = 2000;break
        case '2':priceGt = 2000;priceLte = 5000;break
        case '3':priceGt = 5000;priceLte = 10000;break
      }
    }else{
      switch (priceLevel){
        case 'all':priceGt = 0;priceLte = 10000;break
      }
    }
    paramses = {
      salePrice:{
        $gt:priceGt,
        $lte:priceLte
      }
    }
  //  排序分页
  Goods.find(paramses).sort({'salePrice':sort}).skip(skip).limit(pageSize).exec(
    function (err,doc) {
      if(err){
        res.json({
          status:'1',
          msg:err.message
        })
      }else{
        res.json({
          status:'0',
          msg:'',
          result:{
            count:doc.length,
            list:doc
          }
        })
      }
    })
})

//加入购物车接口
router.post('/addCart',function (req,res,next) {
  let userId = '10007'
  //获取添加的商品ID
  let productId = req.body.productId
  //根据userId查询
  User.findOne({"userId":userId}).exec(function (err,userDoc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
      })
    }else {
      if(userDoc){
        //判断是否有相同的商品加入,从而改变数量以及价格
        let goodsItem = ''
        userDoc.cartList.forEach(function (item) {
          if(item.productId === productId){
            goodsItem = item
            item.productNum++
          }
        })
        if(goodsItem){
          userDoc.save(function (err2,doc2) {
            if(err2){
              res.json({
                status:'0',
                msg:err2.message
              })
            }else{
              res.json({
                status:'0',
                msg:'',
                result:'加入购物车成功'
              })
            }
          })
        }else{
          Goods.findOne({"productId":productId}).exec(function (err1,doc1) {
            if(err){
              res.json({
                status:'1',
                msg:err1.message
              })
            }else {
              if(doc1){
                //设置默认数量为1，已选中
                doc1.productNum = 1
                doc1.checked = 1
                //将doc1查询结果放入userDoc的cartList中
                userDoc.cartList.push(doc1)
                userDoc.save(function (err2,doc2) {
                  if(err2){
                    res.json({
                      status:'0',
                      msg:err2.message
                    })
                  }else{
                    res.json({
                      status:'0',
                      msg:'',
                      result:'加入购物车成功'
                    })
                  }
                })
              }
            }
          })
        }

      }
    }
  })
})

//输出路由让app.js加载
module.exports = router
