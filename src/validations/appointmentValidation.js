const mongoose = require("mongoose");

const validateAppointment = (req, res, next) => {
    const {
        customer_id,
        barber_id,
        service_id,
        appointment_date,
        start_time,
        end_time
    } = req.body;

    if (
        !customer_id ||
        !barber_id ||
        !service_id ||
        !appointment_date ||
        !start_time ||
        !end_time
    ) {
        return res.status(400).json({
            message: "All appointment fields are required"
        });
    }

    if (
        !mongoose.Types.ObjectId.isValid(customer_id) ||
        !mongoose.Types.ObjectId.isValid(barber_id) ||
        !mongoose.Types.ObjectId.isValid(service_id)
    ) {
        return res.status(400).json({
            message: "Invalid ID"
        });
    }

    if (new Date(start_time) >= new Date(end_time)) {
        return res.status(400).json({
            message: "End time must be after start time"
        });
    }

    next();
};

module.exports = validateAppointment;