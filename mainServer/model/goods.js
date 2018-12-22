//引入mongoose
let mongoose = require('mongoose')

//获取schema模型
let productSchema = new mongoose.Schema({
  "productId":String,
  "productName":String,
  "salePrice":Number,
  "productNum":Number,
  "checked":String,
  "productImage":String
})

//将productSchema模型封装在Good中输出出去
module.exports = mongoose.model('Good',productSchema,'goods')




