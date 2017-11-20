/**
 * 
 * @authors LiuKai (451098318@qq.com)
 * @date    2017-09-19 09:49:03
 * @version $Id$
 */
var mongoose = require("mongoose")
var Schema = mongoose.Schema

var productSchema = new Schema({
	"productId": {
		type: String
	},
	"productName": String,
	"salePrice": Number,
	"productImage": String
})

module.exports = mongoose.model("Good", productSchema)