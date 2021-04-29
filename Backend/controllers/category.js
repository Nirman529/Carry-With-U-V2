const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if(err) {
            return res.status(400).json({
                error : "Category not found"
            })
        }
        req.category = cate;
        next();
    })
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if(err) {
            return res.status(400).json({
                error : "Category not saved"
            })
        }
        res.json({category});
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category);
}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err) {
            return res.status(400).json({
                error : "Categories not found"
            });
        }
        res.json(categories);
    })
}

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.category_type = req.body.category_type;

    category.save((err, updatedCategory) => {
        if(err) {
            return res.status(400).json({
                error : "Categories not updated"
            });
        }
        res.json(updatedCategory);
    })
}

exports.deleteCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if(err) {
            return res.status(400).json({
                error : "Category not deleted"
            })
        }
        res.json({
            message : "Category deleted"
        })
    });
}
