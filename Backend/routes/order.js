const express = require("express");
const router = express.Router();

const { getUserById, pushOrderInPurchaseList ,userPurchaseList} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const { getOrderById, createOrder, getAllOrders, getOrderStatus,getOnlyProducts, getOrderByuserId, updateStatus} = require("../controllers/order");
const { updateStoke, getProductById, getAllProductsById, getAllProducts, getProduct} = require("../controllers/product");

router.param("userId", getUserById);
router.param("orderId", getOrderById);

// router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStoke, createOrder);

router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStoke, createOrder);
router.get("/orders/:userId", isSignedIn, isAuthenticated, getAllOrders);

// router.get("/order/get/:userId", isSignedIn, isAuthenticated, getOrderById, getAllOrders);
// router.get("/order/userorder/:userId/:orderId", isSignedIn, isAuthenticated, getOrderByuserId);

router.get("/order/list/:userId",isSignedIn,isAuthenticated, userPurchaseList);

router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);

// router.delete("/order/:orderId/:userId", isSignedIn, isAuthenticated, isAdmin);

module.exports = router;
