const User = require("../models/user.model.js")
const bcrypt = require("bcrypt")
const jwtProvider = require("../config/jwtProvider")



const createUser = async (userData) => {

    try {

        let { firstName, lastName, email, password } = userData;

        const isUserExist = await User.findOne({ email });


        if (isUserExist) {
            throw new Error("user already exist with email : ", email)
        }

        password = await bcrypt.hash(password, 8);

        const user = await User.create({ firstName, lastName, email, password })

        console.log("user ", user)

        return user;


    } catch (error) {
        throw new Error(error.message)
    }
}

const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("user not found with id : ", userId)
        }
        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}


const getUserByEmail = async (email) => {

    try {

        const user = User.findOne({ email });

        if (!user) {
            throw new Error("user is not found with email :", email);
        }
        return user;

    } catch (error) {
        throw new Error(error.message);
    }

}


const getUserProfileByToken = async (token) => {
    
    try {
        const userId = jwtProvider.getUserIdFromToken(token);

        console.log("user id ", userId);

        const user = await findUserById(userId)
        // .populate("addresses");

        if (!user) {
            throw new Error(`User does not exist with id: ${userId}`);
        }

        user.password = undefined; // Use 'undefined' to hide the password field

        return user;

    } catch (error) {
        console.log("Error ----- ", error.message);
        throw new Error(error.message);
    }
};


const getAllUsers = async () => {

    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error.message)
    }

}


module.exports = { createUser, getUserByEmail, findUserById, getAllUsers, getUserProfileByToken }




