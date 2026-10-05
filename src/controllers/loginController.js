const loginService = require("../services/loginService");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await loginService.login(
            email,
            password
        );

        res.json({
            message: "Login Successful",
            token: result.token,
            user: result.user
        });

    } catch (err) {
        res.status(err.statusCode || 401).json({
            message: err.message
        });
    }
};


const register = async (req, res) => {
    try {
        const user = await loginService.registerUser(
            req.body,
            req.user || null
        );

        res.status(201).json({
            message: "Registration Successful",
            user: user
        });

    } catch (err) {
        res.status(err.statusCode || 400).json({
            message: err.message
        });
    }
};


module.exports = {
    login,
    register
};