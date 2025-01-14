const ratingService = require("../services/rating.service.js")

const createRating = async (req, res) => {

    const user = req.user
    try {
        // const review = await ratingService.createRating(req.body.user);
        const rating = await ratingService.createRating(req.body, req.user); 
        return res.status(201).send(rating)

    } catch (error) {
        return res.status(500).send({ error: error.messsage })
    }
}



const getProductsRating = async (req, res) => {

    const productId = req.params.productId;

    const user = req.user
    try {
        const review = await ratingService.getProductsRating(productId);
        return res.status(201).send(review)

    } catch (error) {
        return res.status(500).send({ error: error.messsage })
    }
}



module.exports = {
    createRating,
    getProductsRating
}