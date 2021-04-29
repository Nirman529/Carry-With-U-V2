const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const ProductCartSchema = mongoose.Schema(
    {
        product : {
            type : ObjectId,
            ref : "Product"
        },
        product_name : String,
        product_price : Number,
        adderess : String,
        sphone : Number,
        // seller : String,
        count : Number,
        amount :Number
    },
    { timestamps : true }
);

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = mongoose.Schema({
        products : [ProductCartSchema],
        transactionId : {},
        amount : Number,
        // buyer : String,
        // address : String,
        status : {
            type : String,
            default : "Recieved",
            enum : ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
        },
        updated : Date,
        // product : {
        //     type : ObjectId,
        //     ref : "Product"
        // },
        user : {
            type : ObjectId,
            ref : "User" 
        }
    },        
    { timestamps : true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart}