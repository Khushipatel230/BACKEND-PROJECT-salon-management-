const Barber = require("../models/barberModel");

const getAllBarbers = () => {
    return Barber.find().populate("user_id");
};

const getBarberById = (id) => {
    return Barber.findById(id).populate("user_id");
};

const createBarber = (data) => {
    return Barber.create(data);
};

const updateBarber = (id, data) => {
    return Barber.findByIdAndUpdate(
        id,
        data,
        { new: true }
    );
};

const deleteBarber = (id) => {
    return Barber.findByIdAndDelete(id);
};

module.exports = {
    getAllBarbers,
    getBarberById,
    createBarber,
    updateBarber,
    deleteBarber
};