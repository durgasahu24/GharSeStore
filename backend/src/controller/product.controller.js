const productService = require("../services/product.service.js")
const Product = require("../models/product.model.js")
const Category = require("../models/category.model.js")



const createProduct = async (req, res) => {


    console.log("req body 1 : ", req.body);
    console.log("req body files 1 : ", req.files);

    try {
        const product = await productService.createProduct(req)
        return res.status(200).send(product)

    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ error: error.message })

    }

}

const deleteProduct = async (req, res) => {

    const productId = req.params.id;

    try {
        const product = await productService.deleteProduct(productId)
        return res.status(200).send(product)

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

}


const updateProduct = async (req, res) => {

    const productId = req.params.id;

    try {
        const product = await productService.updateProduct(productId, req.body)
        return res.status(200).send(product)

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

}



const findProductById = async (req, res) => {

    const productId = req.params.id;

    try {
        const product = await productService.findProductById(productId)
        return res.status(200).send(product)

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

}

const getAllProducts = async (req, res) => {

    const productId = req.params.id;

    try {
        const products = await productService.getAllProducts(req.query)
        return res.status(200).send(products)

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

}






async function getLatestProduct(req, res) {

    console.log("welcom to latet product :");

    try {
        // Query to fetch latest products sorted by createdAt in descending order
        const products = await Product.find()
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order
            .limit(10); // Optional: Limit to latest 10 products
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error('Error fetching latest products:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products',
        });
    }
}


const getProductsByCategoryId = async (req, res) => {
    
    try {
        const categoryId = req.params.categoryId;
        const products = await Product.find({ category: categoryId }); // Fetch 5 products for simplicity

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found in this category." });
        }

        res.status(200).json({ products });

    } catch (error) {
        console.error("Error fetching products by category:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const getProductByCategoryName = async (req, res) => {
    try {

        const { category } = req.query;

        if (!category) {
            return res.status(400).json({ error: "Category is required" });
        }

        // Find the category ObjectId
        const categoryObj = await Category.findOne({ name: category });
        if (!categoryObj) {
            return res.status(404).json({ error: "Category not found" });
        }

        const products = await Product.find({ category: categoryObj._id }).limit(5);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};



module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    getLatestProduct,
    getProductsByCategoryId,
    getProductByCategoryName
}