const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const productSchema = mongoose.Schema({
        product_name : {
            type : String,
            trim : true,
            required : true
        },
        product_price : {
            type : Number,
            trim : true,
            required : true
        },
        description : {
            type : String,
            required : true,
            trim : true,
            maxlength : 1000
        },
        // state : {
        //     type : String,
        //     required : false,
        //     trim : true
        // },
        adderess : {
            type : String,
            trim : true,
            required : true
        },
        stock : {
            type : Number,
            required : true
        },
        sold : {
            type : Number,
            required : false,
            default : 0
        },
        category_type : {
            type : ObjectId,
            ref : "Category",
            required : true
        },
        image : {
            data : Buffer,
            contentType : String
        },
        sphone : {
            type : Number,
            required : true,
            trim : true
        }
    },
    { timestamps : true }
);

module.exports = mongoose.model("Product", productSchema);