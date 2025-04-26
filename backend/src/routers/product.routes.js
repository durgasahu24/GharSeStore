const express = require("express")
const router = express.Router();
const productController = require("../controller/product.controller.js");
const authenticate = require("../middleware/authenticate.js");


router.get('/', productController.getAllProducts);
router.get('/id/:id', productController.findProductById);
router.get('/latest', productController.getLatestProduct)
router.get('/category/:categoryId', productController.getProductsByCategoryId)
router.get('/category', productController.getProductByCategoryName)



module.exports = router;