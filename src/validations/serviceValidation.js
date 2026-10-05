const validateService = (req, res, next) => {
    const { service_name, duration, price } = req.body;

    if (!service_name || duration === undefined || price === undefined) {
        return res.status(400).json({
            message: "Service name, duration and price are required"
        });
    }

    if (duration <= 0) {
        return res.status(400).json({
            message: "Duration must be greater than 0"
        });
    }

    if (price < 0) {
        return res.status(400).json({
            message: "Price cannot be negative"
        });
    }

    next();
};

module.exports = validateService;