const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const { getProductById, createProduct, getProduct, image, updateProduct, deleteProduct, getAllProducts, getAllUniqueCategories, getUserProducts} = require("../controllers/product");
const { getUserById} = require("../controllers/user");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post("/product/create/:userId",isSignedIn, isAuthenticated, isAdmin, createProduct);

router.get("/product/:productId", getProduct);

router.get("/product/image/:productId", image);

router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);

router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);

router.get("/products", getAllProducts);

// router.get("/:userId/products",isSignedIn, isAuthenticated, isAdmin, getAllProductsById);
router.get("/products/user/:userId", isSignedIn, isAuthenticated, getUserProducts);


router.get("/products/categories", getAllUniqueCategories);

module.exports = router;