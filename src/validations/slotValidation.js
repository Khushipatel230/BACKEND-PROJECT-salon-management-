const mongoose = require("mongoose");

const validateSlot = (req, res, next) => {
    const {
        barber_id,
        day,
        start_time,
        end_time,
        is_holiday
    } = req.body;

    if (!barber_id || !day) {
        return res.status(400).json({
            message: "Barber ID and day are required"
        });
    }

    if (!mongoose.Types.ObjectId.isValid(barber_id)) {
        return res.status(400).json({
            message: "Invalid barber ID"
        });
    }

    const validDays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    if (!validDays.includes(day)) {
        return res.status(400).json({
            message: "Invalid day"
        });
    }

    if (is_holiday === true) {
        return next();
    }

    if (!start_time || !end_time) {
        return res.status(400).json({
            message: "Start time and end time are required"
        });
    }

    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (
        !timePattern.test(start_time) ||
        !timePattern.test(end_time)
    ) {
        return res.status(400).json({
            message: "Time must be in HH:mm format"
        });
    }

    if (start_time >= end_time) {
        return res.status(400).json({
            message: "End time must be after start time"
        });
    }

    next();
};

module.exports = validateSlot;