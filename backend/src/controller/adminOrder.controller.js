const orderService = require("../services/order.service.js")


const getAllOrders = async (req, res) => {

    try {
        const orders = await orderService.getAllOrders()
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
    
}

const confirmedOrder = async (req, res) => {

    const orderId = req.params.orderId
    try {

        const orders = await orderService.confirmedOrder(orderId)
        return res.status(200).send(orders);

    } catch {
        return res.status(500).send({ error: error.message })
    }
}

const shippOrder = async (req, res) => {

    const orderId = req.params.orderId
    try {

        const orders = await orderService.shipOrder(orderId)
        return res.status(200).send(orders);

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


const deliverOrder = async (req, res) => {

    const orderId = req.params.orderId
    try {

        const orders = await orderService.deliveredOrder(orderId)
        console.log("orders int deliver order :", orders);
        return res.status(200).send(orders);

    } catch (error){
        return res.status(500).send({ error: error.message })
    }
}

const cancelledOrder = async (req, res) => {

    const orderId = req.params.orderId
    try {

        const orders = await orderService.cancelledOrder(orderId)
        return res.status(200).send(orders);

    } catch {
        return res.status(500).send({ error: error.message })
    }
}

const deleteOrder = async (req, res) => {

    const orderId = req.params.orderId
    try {

        const orders = await orderService.deleteOrder(orderId)
        return res.status(200).send(orders);

    } catch(error) {
        return res.status(500).send({ error: error.message })
    }
}



module.exports = {
    getAllOrders,
    confirmedOrder,
    shippOrder,
    deliverOrder,
    cancelledOrder,
    deleteOrder
}



