// const { default: orders } = require("razorpay/dist/types/orders.js");
const cartService = require("../services/cart_service.js")
const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js")
const OrderItem = require("../models/orderItems.js")


async function createOrder(user, shippAddress) {

    let address;

    console.log("address is called : ");

    console.log("user : ", user);
    console.log("ship address ", shippAddress)



    if (shippAddress._id) {
        let existAddress = await Address.findById(shippAddress._id)
        address = existAddress;
    }
    else {

        address = new Address(shippAddress);
        address.user = user;
        await address.save();

        user.address.push(address);
        await user.save();
    }


    const cart = await cartService.findUserCart(user._id);

    console.log("cart in order create :", cart.cartItems);
    const orderItems = [];

    for (const item of cart.cartItems) {
        const orderItem = new OrderItem({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.discountedPrice,
        });

        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem);

    }

    const createdOrder = new Order({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discounte: cart.discounte,
        totalItem: cart.totalItem,
        shippingAddress: address,
        orderDate: new Date(),
        orderStatus: "PENDING", // Assuming OrderStatus is a string enum or a valid string value
        "paymentDetails.status": "PENDING", // Assuming PaymentStatus is nested under 'paymentDetails'
        createdAt: new Date(),
    });

    console.log("created order: ", createdOrder);

    const savedOrder = await createdOrder.save();

    return savedOrder;
}

async function placeOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = 'PLACED',
        order.paymentDetails.status = "COMPLETED"

    return await order.save();
}

async function confirmedOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = 'CONFIRMED'

    return await order.save();
}

async function shipOrder(orderId) {

    console.log("ship order id ", orderId);
    const order = await findOrderById(orderId);

    order.orderStatus = 'SHIPPED'

    return await order.save();
}

async function deliveredOrder(orderId) {

    const order = await findOrderById(orderId);

    if (!order) {
        throw new Error(`Order with ID ${orderId} not found`);
    }

    order.orderStatus = 'DELIVERED';

    return order.save(); // No need for `await` here
}



async function cancelledOrder(orderId) {
    
    const order = await findOrderById(orderId);

    order.orderStatus = 'CANCELLED'

    return await order.save();
}

async function findOrderById(orderId) {

    console.log("orderid in findOrder by id : ", orderId);

    try {
        const order = await Order.findById(orderId)
            .populate("user")
            .populate({ path: "orderItems", populate: { path: "product" } })
            .populate("shippingAddress");

        console.log("Order found in findOrderById:", order);

        if (!order) {
            throw new Error(`Order with ID ${orderId} not found`);
        }

        return order;
    } catch (error) {
        console.error("Error in findOrderById:", error.message);
        throw new Error("Error retrieving order");
    }
}


async function userOrderHistory(userId) {

    console.log("user order history : ", userId);

    try {
        // The lean() method in Mongoose is used in the provided userOrderHistory function to optimize and simplify the retrieved data.
        const orders = await Order.find({ user: userId })
            .populate({ path: "orderItems", populate: { path: "product" } }).lean()

        console.log("orders in service : ", orders);
        return orders;

    } catch (error) {
        throw new Error(error.message);
    }
}


async function getAllOrders() {
    return await Order.find()
        .populate({ path: "orderItems", populate: { path: "product" } }).lean()
}
//douth 
async function deleteOrder(orderId) {
    console.log("order id ", orderId);
    const order = await findOrderById(orderId)
    console.log("order in deleteorder : ", order);
    await Order.findByIdAndDelete(order._id);
}



module.exports = {
    createOrder,
    placeOrder,
    confirmedOrder,
    shipOrder,
    deliveredOrder,
    cancelledOrder,
    findOrderById,
    userOrderHistory,
    getAllOrders,
    deleteOrder
}