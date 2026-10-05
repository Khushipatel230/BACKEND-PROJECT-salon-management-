const mongoose = require("mongoose");

const validateBarber = (req, res, next) => {
    const {
        user_id,
        specialization,
        commission_percentage,
        joining_date
    } = req.body;

    if (
        !user_id ||
        !specialization ||
        commission_percentage === undefined ||
        !joining_date
    ) {
        return res.status(400).json({
            message: "All barber fields are required"
        });
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({
            message: "Invalid user ID"
        });
    }

    if (
        commission_percentage < 0 ||
        commission_percentage > 100
    ) {
        return res.status(400).json({
            message: "Commission must be between 0 and 100"
        });
    }

    next();
};

module.exports = validateBarber;