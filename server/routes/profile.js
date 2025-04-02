const express = require('express');
const authMiddleware = require('../middlewares/authorization');

const router = express.Router();

// Example protected route
router.get('/profile', authMiddleware, (req, res) => {
    console.log("hi")
    res.json({ user: req.user });
});

module.exports = router;
