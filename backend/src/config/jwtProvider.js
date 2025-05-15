const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {
    const token = jwt.sign({ userId, role }, process.env.SECRET_KEY, { expiresIn: "24h" });
    return token;
};

const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // Corrected
    return decodedToken.userId;
};

module.exports = {
    generateToken,
    getUserIdFromToken
};



