const jwt = require('jsonwebtoken');  // Import the JWT package

const isAdmin = (req, res, next) => {

    try {


        // 1. Get the token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).send({ message: 'No token provided.' });
        }

        // 2. Verify and decode the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // 3. Check if the user role is admin
        if (!decoded.role || decoded.role !== 'ADMIN') {
            return res.status(403).send({ message: 'Access forbidden: Admins only.' });
        }

        // 4. If admin, allow the request to proceed
        next();
    } catch (error) {
        // Check for specific JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({ message: 'Invalid token.' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ message: 'Token expired.' });
        }
        return res.status(500).send({ message: 'Failed to authenticate token.' });
    }
};

module.exports = isAdmin;












