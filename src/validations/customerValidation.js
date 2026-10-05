const validateCustomer = (req, res, next) => {
    const { name, phone, email, gender } = req.body;

    if (!name || !phone || !email || !gender) {
        return res.status(400).json({
            message: "All customer fields are required"
        });
    }

    if (!/^\d{10}$/.test(phone)) {
        return res.status(400).json({
            message: "Phone number must contain 10 digits"
        });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
            message: "Invalid email address"
        });
    }

    next();
};

module.exports = validateCustomer;