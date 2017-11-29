var express=require("express")
var router=express.Router()
var mongoose=require("mongoose")
var Goods=require("../models/goods.js")
var urlModule = require('url')

mongoose.connect('mongodb://127.0.0.1:27017/mall')


mongoose.connection.on('connected',function(){
  console.log("MongoDB connected success.")
})


mongoose.connection.on('error',function(){
  console.log("MongoDB connected fail.")
})

mongoose.connection.on('disconnected',function(){
  console.log("MongoDB connected disconnected.")

})

router.post("/",function(req,res,next){
   new Goods(req.body).save(function(err,doc) {
         if (err) {
             console.log(err);
         } else {
             res.json({
               status: '0',
               msg: '',
               result: {
                 count:doc.length,
                 list:doc
               }
             });
         }
     });
})

// router.get('/', function (req, res) {
//   new Goods(req.body.info).save(function (err) {
//     if (err) {
//       res.status(500).send()
//       return
//     }
//     res.send()
//   })
// })



// router.get("/", function(req, res) {
//     let params = urlModule.parse(req.url, true).query;
//     let goodsid = params.productId;
//     let goodsname = params.productName;
//     let price = params.salePrice;
//     let img = params.productImage;
//     var beta = new Goods({
//         productId: goodsid,
//         productName: goodsname,
//         salePrice: price,
//         productImage: img
//     });
//     beta.save(function(err) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send("存入成功！！");
//         }
//     });

// });


module.exports=router