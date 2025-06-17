
const orderService = require("../services/order.service.js")

const createOrder = async (req, res) => {

    const user = await req.user

    // console.log("req data in controller : ", req.body);
    // console.log("user : in create order controller", req.user);

    try {

        let createdOrder = await orderService.createOrder(user, req.body);

        res.status(201).send(createdOrder)

    } catch (error) {
        return res.status(200).send({ error: error.message })
    }

}


const findOrderById = async (req, res) => {
    const user = req.user
    console.log("order : ", req)
    console.log("order : ", req.params);
    console.log("order id in controller : ", req.params.id);
    try {

        let createdOrder = await orderService.findOrderById(req.params.id);
        res.status(201).send(createdOrder)

    } catch (error) {
        return res.status(200).send({ error: error.message })
    }
}


const orderHistory = async (req, res) => {

    const user = await req.user
    console.log("user _id ", user._id);
    
    try {
        let createdOrder = await orderService.userOrderHistory(user._id)
        res.status(201).send(createdOrder)

    } catch (error) {
        return res.status(200).send({ error: error.message })
    }
}


module.exports = {
    createOrder,
    findOrderById,
    orderHistory
}
