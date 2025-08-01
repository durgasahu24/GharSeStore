const express = require('express')
const router = express.Router();
const authenticate = require("../middleware/authenticate.js")
const cartController = require("../controller/cart.controller.js")


// GET: /api/cart
router.get("/", authenticate, cartController.findUserCart);


// PUT: /api/cart/add
router.put("/add", authenticate, cartController.addItemToCart);


module.exports = router;