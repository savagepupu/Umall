let express = require('express');
let router = express.Router();
let Users = require('../model/users')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//二级路由
router.get('/test', function(req, res, next) {
  res.send('test');
});

//登录接口
router.post('/login',function (req,res,next) {
  let userParam = {
    userName:req.body.userName,
    userPwd:req.body.userPwd
  }
  Users.findOne(userParam,function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      if(doc){
        res.cookie("userId",doc.userId,{
          path:'/',
          maxAge:1000*60*60*1000
        })
        res.cookie("userName",doc.userName,{
          path:'/',
          maxAge:1000*60*60*1000
        })
        res.json({
          status:'0',
          msg:'',
          result:{
            userName:doc.userName
          }
        })
      }
    }
  })
})

// 登出接口
router.post('/logout',function (req,res,next) {
  res.cookie('userId','',{
    path:'/',
    maxAge:-1
  })
  res.json({
    status:'0',
    msg:'',
    result:''
  })
})

//验证是否登录接口
router.get('/checkLogin',function (req,res,next) {
  if(req.cookies.userId){
    res.json({
      status:'0',
      msg:'',
      //将用户的登录名返回给客户端
      result:req.cookies.userName
    })
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    })
  }
})

//购物车列表查询
router.get('/cartList',function (req,res,next) {
  let userId = req.cookies.userId
  Users.findOne({userId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:'',
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc.cartList
      })
    }
  })
})

//商品数量的修改
router.post('/cartEdit',function (req,res,next) {
  let userId = req.cookies.userId,
      productId = req.body.productId,
      productNum = req.body.productNum,
      checked = req.body.checked
  Users.update({"userId":userId,"cartList.productId":productId},{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      })
    }
  })
})

//购物车删除
router.post('/cartDel',function (req,res,next) {
  let userId = req.cookies.userId
  let productId = req.body.productId
  Users.update({userId:userId},{$pull:{'cartList':{'productId':productId}}},function (err,doc) {
    if (err){
      res.json({
        status:'1',
        msg:err.message,
        result:'删除失败'
      })
    }else{
      res.json({
        status:'1',
        msg:'',
        result:'已从购物车中移除'
      })
    }
  })
})

//商品全选
router.post('/cartCheckAll',function (req,res,next) {
  let userId = req.cookies.userId,
      checked = req.body.checkAll
  Users.findOne({userId:userId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        doc.cartList.forEach(
          (item)=>{
            item.checked = checked
          }
        )
        doc.save(function (err1,doc1) {
          if(err1){
            res.json({
              status:'1',
              msg:err1.message,
              result:''
            })
          }else{
            res.json({
              status:'0',
              msg:'',
              result:'suc'
            })
          }
        })
      }
    }
  })
})

//用户地址查询
router.get('/addressList',function (req,res,next) {
  let userId = req.cookies.userId
  Users.findOne({userId:userId},function (err,addressListDoc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:addressListDoc.addressList
      })
    }
  })
})


//查询购物车数量接口
router.get('/getCartCount',function (req,res,next) {
  let userId = req.cookies.userId
  Users.findOne({userId:userId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      let cartCount = 0
      let catList = doc.cartList
      catList.map(function (item) {
        cartCount += parseInt(item.productNum)
      })
      res.json({
        status:'0',
        msg:'',
        result:cartCount
      })
    }
  })
})
module.exports = router;
