const userSchema = require("../models/user.model.js")
const userService = require("../services/user.service.js")
const jwtProvider = require("../config/jwtProvider.js")

// [bearer,token]

const getUserProfile = async (req, res) => {
    console.log("profile:");
    try {
        const jwt = req.headers.authorization?.split(' ')[1];
        console.log("req headers authorization ", req.headers.authorization)

        if (!jwt) {
            return res.status(404).send({ error: "token not found" })
        }
        const user = await userService.getUserProfileByToken(jwt)

        return res.status(200).send(user)


    } catch (error) {
        console.log("error from controller - ", error)
        return res.status(500).send({ error: error.message })
    }
}



const getAllUsers = async (req, res) => {

    try {
        const users = await userService.getAllUsers();
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }

}


// module.exports = {getUserProfile,getAllUsers}

module.exports = {
    getUserProfile,
    getAllUsers
}


