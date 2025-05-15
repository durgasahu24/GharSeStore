
const { uploadOnCloudinary } = require("../utils/cloudinary"); // Assuming cloudinary upload function exists
const Product = require("../models/product.model");
const Category = require("../models/category.model");




async function createProduct(req, res) {


    const sizes = [];
    Object.keys(req.body).forEach((key) => {
        const match = key.match(/^sizes\[(\d+)\]\.(.+)$/); // Match 'sizes[0].name', 'sizes[0].quantity', etc.
        if (match) {
            const index = parseInt(match[1], 10); // Extract index
            const field = match[2].trim();        // Trim spaces from field name

            sizes[index] = sizes[index] || {};   // Initialize the object if undefined
            sizes[index][field] = req.body[key]; // Assign the value (e.g., { name: "S" })
        }
    });

    console.log("Reconstructed sizes:", sizes);


    try {
        // Fetch the top-level category
        let topLevel = await Category.findOne({ name: req.body.topLevelCategory });

        console.log('below topLevel:');
        console.log(topLevel);
        console.log("above topLevel");

        if (!topLevel) {
            const topLavelCategory = new Category({
                name: req.body.topLevelCategory,
                level: 1,
            });
      
            topLevel = await topLavelCategory.save();
        }
        console.log("toplevel : ", topLevel);

        // Fetch the second-level category
        console.log("secondlevel value : ", req.body.secondLevelCategory)
        console.log("secondlevel value : ", req.body.secondLevelCategory)
        
        let secondLevel = await Category.findOne({
            name: req.body.secondLevelCategory,
            parentCategory: topLevel._id,
        });

        // console.log("second level : ", secondLevel);
        if (!secondLevel) {
            const secondLavelCategory = new Category({
                name: req.body.secondLevelCategory,
                parentCategory: topLevel._id,
                level: 2,
            });
            // console.log("inside topLevel", secondLevelCategory);
            console.log("after secondLevel");
            secondLevel = await secondLavelCategory.save();
        }

        // Fetch the third-level category
        let thirdLevel = await Category.findOne({
            name: req.body.thirdLevelCategory,
            parentCategory: secondLevel._id,
        });

        // console.log("thired Level :", thirdLevel);


        if (!thirdLevel) {
            const thirdLavelCategory = new Category({
                name: req.body.thirdLevelCategory,
                parentCategory: secondLevel._id,
                level: 3,
            });
            console.log("inside thired Level");
            // console.log("after inside :", thirdLevelCategory);
            thirdLevel = await thirdLavelCategory.save();
        }

        // console.log("firstCategory", topLavel)
        console.log("secondCategory", secondLevel)
        console.log("thirdCategory", thirdLevel);

        // Ensure images are uploaded using Cloudinary
        if (!req.files || req.files.length < 1) {
            return res.status(400).json({ error: "At least one image is required." });
        }

        const imageUrls = [];
        // Loop through each file, upload to Cloudinary and collect the URLs
        for (const file of req.files) {
            const cloudinaryResponse = await uploadOnCloudinary(file.path);  // Upload to Cloudinary
            if (cloudinaryResponse && cloudinaryResponse.secure_url) {
                imageUrls.push(cloudinaryResponse.secure_url);
            }
        }

        console.log("imageUrls: ", imageUrls);
        console.log("discouted persent :", req.body.discountedPrice)

        // Create the product with the Cloudinary image URLs
        const product = new Product({
            title: req.body.title,
            color: req.body.color,
            description: req.body.description,
            discountedPrice: req.body.discountedPrice,
            discountPersent: req.body.discountPercent,
            images: imageUrls, // Use the Cloudinary URLs for images
            brand: req.body.brand,
            price: req.body.price,
            sizes: sizes,
            quantity: req.body.quantity,
            category: thirdLevel._id, // Set category to the third-level category
        });

        console.log("product in service : ", product);

        // Save the product
        const savedProduct = await product.save();

        // Respond with the saved product
        return savedProduct;
    } catch (error) {
        console.error("Error in creating product:", error);
        throw new Error("Failed to create product");
    }
}





async function deleteProduct(productId) {
    const product = await findProductById(productId);

    await Product.findByIdAndDelete(productId);
    return "Product deleted Successfully :"
}


async function updateProduct(productId, reqData) {
    return await Product.findByIdAndUpdate(productId, reqData);
}



async function findProductById(productId) {
    const product = await Product.findById(productId).populate({
        path: "reviews",
        populate: {
            path: "user",
            select: "name email"
        }, // Also populate user details if needed
    }).populate({
        path: "ratings", // Populate ratings
        populate: {
            path: "user", // Populate user within each rating
            select: "name email" // Optional: select specific fields from user
        }
    });;

    if (!product) {
        throw new Error("Product not found with id " + productId);
    }

    return product;
}

async function getAllProducts(reqQuery) {

    console.log("reqQuery : ", reqQuery);

    let {
        category,
        sizes,
        minPrice,
        maxPrice,
        minDiscount,
        sort,
        stock,
        pageNumber = 1,
        pageSize = 10,
        color
    } = reqQuery;

    let query = Product.find().populate({ path: "category", select: "name" });

    // Handle category filtering
    if (category) {

        const existCategory = await Category.findOne({ name: category.trim() });

        if (existCategory) {
            query = query.where("category").equals(existCategory._id);
        } else {
            return { content: [], currentPage: pageNumber, totalPages: 0 }; // No products for invalid category
        }
    }

    // console.log("query for category : ", query);

    // Handle color filtering
    if (color) {
        const colorSet = new Set(color.split(",").map(c => c.trim().toLowerCase()));
        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
        if (colorRegex) {
            query = query.where("color").regex(colorRegex);
        }
    }

    // Handle size filtering
    if (sizes) {
        const sizesSet = new Set(sizes);
        query = query.where("sizes.name").in([...sizesSet]);
    }

    // Handle price filtering
    if (minPrice && maxPrice) {
        query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    }


    // Handle discount filtering
    if (minDiscount) {
        console.log("this is discount: ", minDiscount);
        query = query.where("discountPersent").gt(minDiscount);
    }

    // Handle stock filtering
    if (stock) {
        if (stock === "in_stock") {
            query = query.where("quantity").gt(0);
        } else if (stock === "out_of_stock") {
            query = query.where("quantity").lte(0);
        }
    }

    // Handle sorting
    if (sort) {
        const sortDirection = sort === "price_high" ? -1 : 1;
        query = query.sort({ discountedPrice: sortDirection });
    }


    // Pagination
    const totalProducts = await Product.countDocuments(query);
    const skip = (pageNumber - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);

    const products = await query.exec();
    const totalPages = Math.ceil(totalProducts / pageSize);

    console.log("contend : ", products);

    return { content: products, currentPage: pageNumber, totalPages };
}





module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,

}






