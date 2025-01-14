
const userService = require("../services/user.service.js");
const CartItem = require("../models/cartItem.model.js");



async function updateCartItem(userId, cartItemId, cartItemData) {


    try {

        const item = await findCartItemById(cartItemId)

        console.log("item  uututuytugubt8tv8  : ")

        if (!item) {
            throw new Error("cart item not found : ", cartItemId);
        }

        const user = await userService.findUserById(userId);

        if (!user) {
            throw new Error("user not found ", userId);
        }

        if (user._id.toString() === userId.toString()) {
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.discountedPrice;
            item.discountedPrice = item.quantity * item.product.discountedPrice;
            const roshan = await item.save();
            console.log("updateCartItem ",roshan)
            return roshan;
        }
        else {
            throw new Error("you can't update this cart item :")
        }




        // const item = await findCartItemById(cartItemId.trim())
      
        // if(!item){
        //   throw new Error("cart item not found : ",cartItemId)
        // }
        // const user = await userService.findUserById(item.userId);
      
        // if(!user){
        //   throw new Error("user not found : ",userId)
        // }
      
      
        // if (user.id === userId.toString()) {
        //   item.quantity = cartItemData.quantity;
        //   item.price = item.quantity * item.product.price;
        //   item.discountedPrice = item.quantity * item.product.discountedPrice;
      
        //   const upadatedCartItem = await item.save();
        //   console.log("here is roshan define")
        //   console.log("roshan",upadatedCartItem)
        //   return upadatedCartItem;
        // } else {
        //   throw new Error("You can't update another user's cart_item");
        // }      

    } catch (error) {
        throw new Error(error.message);
    }

}

async function removeCartItem(userId, cartItemId) {
    const cartItem = await findCartItemById(cartItemId)
    const user = await userService.findUserById(userId);
    if (user._id.toString() === cartItem.userId.toString()) {
        return await CartItem.findByIdAndDelete(cartItemId);
    }

    throw new Error("you can't remove another users item ");
}

async function findCartItemById(cartItemId) {

    const cartItem = await CartItem.findById(cartItemId).populate("product")

    if (cartItem) {
        return cartItem
    }
    else {
        throw new Error("cartItem not found with id ", cartItem)
    }
}



module.exports = {
    updateCartItem,
    removeCartItem,
    findCartItemById
}