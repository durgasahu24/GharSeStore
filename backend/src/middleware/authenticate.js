const jwtProvider = require("../config/jwtProvider.js")
const userService = require("../services/user.service.js")


const austhenticate = async (req, res, next) => {

    console.log("welecome to is austhenticate ")

    //bearer token....

    try {

        const token = req.headers.authorization?.split(" ")[1];
        // console.log("requsert header : ", req.headers.authorization)


        if (!token) {
            return res.status(404).send({ message: "token not found" })
        }


        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await userService.findUserById(userId);
        req.user = user;


    } catch (error) {
    
        return res.status(500).send({ error: error.message });
    }
    next();

}

module.exports = austhenticate;

