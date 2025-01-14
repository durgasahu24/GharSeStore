// In your routes file
const upload = require("../middleware/multer.middleware.js");
const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller.js");
const authenticate = require("../middleware/authenticate.js");
const isAdmin = require("../middleware/isAdmin.js")

// router.post('/', authenticate, upload.array("images", 4), productController.createProduct);
// router.post('/create',authenticate,isAdmin, upload.array("images", 4),productController.createProduct);
router.post('/creates', authenticate, isAdmin, productController.createMultipleProduct);
router.delete('/:id', authenticate, productController.deleteProduct);
router.put('/:id', authenticate, productController.updateProduct);


// const express = require('express');
// const router = express.Router();
// const upload = require('./multer.middleware');
// const productController = require('./controllers/productController');
// const authenticate = require('./middleware/authenticate');
// const isAdmin = require('./middleware/isAdmin');

// Route to handle product creation
router.post('/create', upload.array('images', 4), (req, res) => {
        if (!req.files) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        // Now handle the body and files
        console.log('Received files:', req.files);
        console.log('Form fields:', req.body);

        // You can proceed with the rest of your logic here...
        productController.createProduct(req, res); // If all is fine, move forward with the controller.
    });


// router.post('/create', upload.array('images', 4), (req, res) => {
//     console.log('req.files:', req.files); // Should contain an array of uploaded files
//     console.log('req.body:', req.body); // Should contain other form fields
// });



module.exports = router;


// module.exports = router;
