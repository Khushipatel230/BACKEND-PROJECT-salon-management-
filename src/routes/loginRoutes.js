const express = require("express");
const jwt = require("jsonwebtoken");

const { verifyToken } = require("../middlewares/authMiddleware");
const validateLogin = require("../validations/loginValidation");

const {
    login,
    register
} = require("../controllers/loginController");

const router = express.Router();

const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (err) {
            // Ignore token error if optional
        }
    }
    next();
};

router.post(
    "/",
    validateLogin,
    login
);

router.post(
    "/register",
    optionalAuth,
    register
);

router.get("/verify", verifyToken, (req, res) => {
    res.json({
        message: "Token is valid",
        user: req.user
    });
});

module.exports = router;