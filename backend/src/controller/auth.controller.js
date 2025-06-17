const userService = require("../services/user.service")
const jwtProvider = require("../config/jwtProvider")
const cartService = require("../services/cart_service")
const bcrypt = require("bcrypt")


const register = async (req, res) => {

    try {

        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user._id);

        await cartService.createCart(user);

        return res.status(200).send({ jwt, message: "register success" })

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

}



const login = async (req, res) => {
    
    try {
        const { email, password, role } = req.body;

        // Step 1: Fetch user by email
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(401).send({ message: "User not found" });
        }

        // Step 2: Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid password" });
        }

        // Step 3: Check if requested role matches stored role
        if (role && role !== user.role) {
            return res.status(403).send({ message: `Unauthorized role access: You are not a ${role}` });
        }

        // Step 4: Generate token using DB role
        const jwtToken = jwtProvider.generateToken(user._id, user.role);

        return res.status(200).send({
            jwt: jwtToken,
            role: user.role,
            message: "Login success"
        });

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};





module.exports = { register, login }
