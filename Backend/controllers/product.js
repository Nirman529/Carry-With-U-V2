const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const user = require("../models/user");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err || !product) {
            return res.status(400).json({
                error : "Product not found"
            });
        }
        req.product = product;
        next();
    });
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                error : "problem with image"
            })
        }

        //destructure the items
        const {product_name, product_price, description, sphone, adderess, stock, category_type } = fields;

        if(!product_name || !product_price || !description || !sphone || !adderess || !stock || !category_type) {
            return res.status(400).json({
                error : "Include all fields"
            })
        }

        let product = new Product(fields);

        //handle file here
        if(file.image) {
            if(file.image.size > 3000000) {
                return res.status(400).json({
                    error : "Maximum file size is 3MB"
                })
            }
            product.image.data = fs.readFileSync(file.image.path);
            product.image.contentType = file.image.type; 
        }

        //console.log(product);

        //save to DB
        product.save((err, product) => {
            if(err) {
                return res.status(400).json({
                    error : "Product not saved in DB"
                })
            }
            res.json(product);
        })
    })
}

exports.getProduct = (req, res) => {
    req.product.image = undefined;
    return res.json(req.product);
}

exports.image = (req, res, next) => {
    if(req.product.image.data) {
        res.set("content-Type", req.product.image.contentType);
        return res.send(req.product.image.data);
    }
    next();
}


exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                error : "problem with image"
            })
        }

        //updation part
        let product = req.product;
        product = _.extend(product, fields);

        //handle file here
        if(file.image) {
            if(file.image.size > 3000000) {
                return res.status(400).json({
                    error : "Maximum file size is 3MB"
                })
            }
            product.image.data = fs.readFileSync(file.image.path);
            product.image.contentType = file.image.type; 
        }

        //console.log(product);

        //save to DB
        product.save((err, product) => {
            if(err) {
                return res.status(400).json({
                    error : "Not updated the product"
                })
            }
            res.json(product);
        })
    })
}

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error : "Not delete the product"
            })
        }
        res.json({
            message : "Deleted the product",
            deletedProduct
        })
    })
}

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
    .select("-image")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
        if(err) {
            return res.status(400).json({
                error : "Product not found"
            })
        }
        res.json(products);
    })
}


exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {} , (err, category) => {
        if(err) {
            return res.status(400).json({
                error : "No category found"
            })
        }
        res.json(category);
    })
}

exports.getUserProducts = (req, res) => {
    Product.find({product :req.product._id })
    .populate("products.product")
    .exec((err, product)=> {
        if(err) {
            return res.status(400).json({
                error : "No product"
            });
        }
        return res.json(product);
    })
}

exports.updateStoke = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne : {
                filter : {_id : prod._id},
                update : { $inc : {stock : -prod.count, sold : +prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperations, {}, (err, products) => {
        if(err) {
            return res.status(400).json({
                error : "Bulk operation failed"
            })
        }
        next();
    });
}