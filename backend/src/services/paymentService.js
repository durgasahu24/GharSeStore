const razorpay = require("../config/razorpayClient")
const orderService = require("../services/order.service.js")


const createPaymentLink = async (orderId) => {

    console.log("order id in payment : ", orderId);

    try {

        const order = await orderService.findOrderById(orderId);

        const paymentLinkRequest = {
            amount: order.totalPrice * 100,
            currency: "INR",
            customer: {
                name: order.user.firstName + " " + order.user.lastName,
                contact: order.shippingAddress.mobile,
                email: order.user.email,
            },
            notify: {
                sms: true,
                email: true,
            },
            reminder_enable: true,
            callback_url: `https://ghar-se-store.vercel.app/payment/${orderId}`,
            callback_method: 'get'
        };

        // console.log("payment link request ", paymentLinkRequest);


        // console.log("razorpay : ", razorpay.paymentLink.create);



        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

        console.log("paymentLink : ", paymentLink);




        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url;  // it will redirect payment page of razorpay gateway 

        console.log("payment_line_rul  : ", payment_link_url)

        const resData = {
            paymentLinkId,
            payment_link_url
        }

        console.log("resdata ; ", resData);

        return resData;


    } catch (error) {
        throw new Error(error.message);
    }
}

const updatePaymentInformation = async (reqData) => {



    console.log("welcome to service payment : ");



    const paymentId = reqData.payment_id;
    const orderId = reqData.order_id;

    console.log("update payment service payment id and orderId:", paymentId, orderId);

    try {
        // Find the order by ID
        const order = await orderService.findOrderById(orderId);
        if (!order) {
            throw new Error(`Order with ID ${orderId} not found.`);
        }

        console.log("Order in update payment:", order);
        console.log("Order status in update payment:", order.orderStatus);

        // Fetch payment details from Razorpay
        const payment = await razorpay.payments.fetch(paymentId);

        if (!payment) {
            throw new Error(`Payment with ID ${paymentId} not found.`);
        }

        console.log("payment : ", payment);

        // Check if the payment is captured
        if (payment.status === "captured") {
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.paymentStatus = "COMPLETED";
            order.orderStatus = "PLACED";

            console.log("order : ", order);

            // Save the updated order
            await order.save().catch(err => {
                throw new Error("Failed to save order: " + err.message);
            });
            
        } else {
            throw new Error(`Payment not captured. Current status: ${payment.status}`);
        }

        // Return a success response
        const response = { message: "Your order is placed", success: true };
        return response;

    } catch (error) {
        console.error("Error updating payment information:", error.message);
        throw new Error(error.message);
    }



}

module.exports = {
    createPaymentLink,
    updatePaymentInformation
}