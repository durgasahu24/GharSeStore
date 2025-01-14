const paymentService = require("../services/paymentService")


const createPaymentLink = async (req, res) => {

    console.log("create payment controller : ");

    try {

        const paymentLink = await paymentService.createPaymentLink(req.params.id);

        return res.status(200).send(paymentLink);

    } catch (error) {
        return res.status(500).send(error.message);
    }

}


const updatePaymentInformation = async (req, res) => {

    console.log("welcomon updatePayment infromation : ", req.query);

    try {

        await paymentService.updatePaymentInformation(req.query);

        return res.status(200).send({ message: "payment information updated : ", status: true });

    } catch (error) {
        return res.status(500).send(error.message);
    }

}


module.exports = {
    createPaymentLink,
    updatePaymentInformation
}