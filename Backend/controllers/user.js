const User = require("../models/user");
const {Order} = require("../models/order"); 
const { forEach } = require("lodash");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error : "User not found"
            });
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify : false},
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    error : "You can not update"
                });
            }
            user.salt = undefined;
            res.json(user);
        }
    );
};

exports.userPurchaseList = (req, res) => {
    Order.find({user :req.profile._id })
    .populate("user products.product")
    .exec((err, order)=> {
        if(err) {
            return res.status(400).json({
                error : "No order"
            });
        }
        return res.json(order);
    })
}

exports.pushOrderInPurchaseList = (req, res, next) => {
    // console.log(req.body.order.products);
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id : product._id,
            // image : product.image.data,
            product_name : product.product_name,
            product_price : product.product_price,
            description : product.description,
            category_type : product.category_type,
            stock : product.stock,
            sphone : product.sphone,
            adderess : product.adderess,
            amount : req.body.order.amount,
            transaction_id : req.body.order.transactionId
        })
    // req.file.order.products.forEach(product => {
    //     purchases.push({
    //         image : product.file,
    //     })
    // })
        // console.log(products);
    })

    User.findOneAndUpdate(
        {_id : req.profile._id},
        {$push : {purchases : purchases}},
        {new : true},
        (err, purchaselist) => {
            if(err) {
                return res.status(400).json({
                    error : "unable to save product"
                })
            }
            // return res.json(purchaselist);
            next();
        }
    )
}