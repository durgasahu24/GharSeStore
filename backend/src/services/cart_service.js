const Cart = require("../models/cart.model.js");
const CartItem = require("../models/cartItem.model.js")
const Product = require("../models/product.model.js")
const User = require("../models/user.model.js")


async function createCart(user) {

    try {
        const cart = new Cart({ user });
        const createdCart = await cart.save();// data save in database 
        console.log("created cart : ", createdCart);
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    }

}


async function findUserCart(userId) {

    try {


        let cart = await Cart.findOne({ user: userId })
        console.log("cart in findUserCart : ", cart);

        let cartItems = await CartItem.find({ cart: cart._id }).populate("product")

        cart.cartItems = cartItems


        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;

        for (const cartItem of cart.cartItems) {
            totalPrice += cartItem.price;
            totalDiscountedPrice += cartItem.discountedPrice;
            totalItem += cartItem.quantity;
        }

        cart.totalPrice = totalPrice;
        cart.totalItem = totalItem;
        cart.totalDiscountedPrice = totalDiscountedPrice;
        cart.discounte = totalPrice - totalDiscountedPrice;

        // const updatedCart = await cart.save();
        return cart;


    } catch (error) {
        throw new Error(error.message);
    }
}

async function addCartItem(userId, req) {

    console.log("req : ", req.productId);

    try {

        const cart = await Cart.findOne({ user: userId });
        console.log("cart : ", cart);
        const product = await Product.findById(req.productId);

        console.log("product : ", product);

        const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId: userId });

        console.log("is present : ", isPresent);


        if (!isPresent) {

            console.log("is present : ");
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.discountedPrice,
                size: req.size,
                discountedPrice: product.discountedPrice
            });



            const createdCartItem = await cartItem.save();
            console.log('created cart Item : ', createdCartItem);
            cart.cartItems.push(createdCartItem);
            await cart.save();

            return createdCartItem
        }

        return isPresent;

    } catch (error) {
        throw new Error(error.message);
    }
}



// module.exports = { createCart,findUserCart,addCartItem};

module.exports = {
    createCart,
    findUserCart,
    addCartItem
}