const cartService = require("../services/cart_service.js")

const findUserCart = async (req, res) => {

    const user = req.user;


    try {
        const cart = await cartService.findUserCart(user._id)
        return res.status(200).send(cart);

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

}


const addItemToCart = async (req, res) => {

    console.log("request user :", req.user);
    console.log("request body :", req.body);


    const user = req.user;
    console.log("user _id ", user._id);


    try {
        const cartItem = await cartService.addCartItem(user._id.toString(), req.body)
        console.log("cart item : ", cartItem);
        return res.status(200).send(cartItem);

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

}


module.exports = {
    findUserCart,
    addItemToCart
}
