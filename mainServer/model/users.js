/*
* 此页面用于定义用户模型
* */
let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":Array,
  "cartList":[
    {
      "productId":String,
      "productName":String,
      "salePrice":Number,
      "productImage":String,
      "checked":String,
      "productNum":Number
    }
  ],
  "addressList":[
    {
      "adressId" : String,
      "userName" : String,
      "streetName" : String,
      "postCode" : String,
      "tel" : String,
      "isDefault" : Boolean

    }
  ]
})

module.exports = mongoose.model('User',userSchema,'users')

