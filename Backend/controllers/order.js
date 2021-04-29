const { Order, ProductCart} = require("../models/order");
const product = require("../models/product");
const user = require("../models/user");
// const { getProduct, getProductById } = require("./product");

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
    .populate("products.product")
    .exec((err, order) => {
        if(err) {
            return res.status(400).json({
                error : "No order found"
            })
        }
        req.order = order;
        next();
    })
}

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, order) => {
        if(err) {
            return res.status(400).json({
                error : "Order not saved in DB"
            })
        }
        res.json(order);
    })
}

exports.getAllOrders = (req, res) => {
    Order.find()
    .populate("user products.product")
    .exec((err, order) => {
        if(err) {
            return res.status(400).json({
                error : "No orders found"
            })
        }
        res.json(order);
    })
}

exports.getOnlyProducts = (req, res) => {
    Order.find()
    // .populate('user product', ' product_name _id first_name address phone')
    .populate("products.product")
    .exec((err, order) => {
        if(err) {
            return res.status(400).json({
                error : "No orders found"
            })
        }
        // console.log(order.length)
        res.json(order);
    })

}

exports.updateStatus = (req, res) => {
    Order.update(
        {_id : req.body.orderId},
        {$set : {status :req.body.status}},
        (err, order) => {
            if(err) {
                return res.status(400).json({
                    error : "Not update order status"
                })
            }
            res.json(order);
        }
    )
}

exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
}

// exports.deleteAllOrder = (req, res) => {
//     // let order = req.order;
//     Order.remove((err, deletedOrder) => {
//         if(err) {
//             return res.status(400).json({
//                 error : "Not delete the order"
//             })
//         }
//         res.json({
//             message : "Deleted the order",
//             deletedOrder
//         })
//     })
// }

exports.getOrderByuserId = (req, res) => {
    console.log("gya")
    Order.find()
    // .populate("user")
    .exec((err, order) => {
        if(err) {
            return res.status(400).json({
                error : "No order found"
            })
        }
        req.order = order;
    })
}