const Wage = require("../models/wageModel");

// Get all wage records
const getAllWages = () => {
    return Wage.find()
        .populate("barber_id")
        .populate("appointment_id");
};

// Get wage by ID
const getWageById = (id) => {
    return Wage.findById(id)
        .populate("barber_id")
        .populate("appointment_id");
};

// Find wage for an appointment
const findByAppointment = (appointment_id) => {
    return Wage.findOne({
        appointment_id
    });
};

// Create wage
const createWage = (data) => {
    return Wage.create(data);
};

// Update wage
const updateWage = (id, data) => {
    return Wage.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

// Delete wage
const deleteWage = (id) => {
    return Wage.findByIdAndDelete(id);
};

module.exports = {
    getAllWages,
    getWageById,
    findByAppointment,
    createWage,
    updateWage,
    deleteWage
};