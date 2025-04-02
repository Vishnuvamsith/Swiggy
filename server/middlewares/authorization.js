const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access Denied. Invalid token format." });
        }

        const token = authHeader.split(" ")[1]; // Extract token from `Bearer <token>`
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Calculate remaining expiration time in seconds
        const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
        const expiresIn = decoded.exp - currentTime; // Time left in seconds

        req.user = {
            ...decoded,
            expiresIn // Attach remaining expiration time
        };

        next(); // Continue to next middleware or route
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};
