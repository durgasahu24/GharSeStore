const userService = require("../services/user.service")
const jwtProvider = require("../config/jwtProvider")
const cartService = require("../services/cart_service")
const bcrypt = require("bcrypt")


const register = async (req, res) => {

    console.log("req: ", req);


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
        // Destructure email, password, and role from the request body
        const { email, password, role } = req.body;

        console.log("email,password,role",email,password,role);

        // Step 1: Fetch user by email
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(401).send({ message: "User not found with email: " + email });
        }

        // Step 2: Compare entered password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid password" });
        }

        // Step 3: Check if the provided role is valid for the user
        let userRole = role || "customer"; // Default to 'customer' if no role is provided

        // If the credentials match the admin credentials, assign role 'admin'
        if (email === "ds@gmail.com" && password === "ds1234" && role === "ADMIN") {
            userRole = "ADMIN";
        } else if (email === "ds@gmail.com" && password === "ds1234" && role != "ADMIN") {
            return res.status(400).send({ message: "Invalid user and email" });
        }

        // Step 4: Generate JWT token with user ID and role
        const jwtToken = jwtProvider.generateToken(user._id, userRole);

        // Step 5: Return JWT token along with the role and success message
        return res.status(200).send({ jwt: jwtToken, role: userRole, message: "Login success" });

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};




// const login = async (req, res) => {

//     try {

//         const { password, email } = req.body;

//         const user = await userService.getUserByEmail(email);

//         if (!user) {
//             return res.status(401).send({ message: "user not found with email  :" })
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password)

//         if (!isPasswordValid) {
//             return res.status(401).send({ message: "invalid password :" });
//         }

//         const jwt = jwtProvider.generateToken(user._id);

//         return res.status(200).send({ jwt, message: "login success :" })

//     } catch (error) {
//         return res.status(500).send({ error: error.message });
//     }

// }



module.exports = { register, login }
