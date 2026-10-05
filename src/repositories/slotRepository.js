const Slot = require("../models/slotModel");

const getAllSlots = () => {
    return Slot.find();
};

const getSlotById = (id) => {
    return Slot.findById(id);
};

const createSlot = (data) => {
    return Slot.create(data);
};

const updateSlot = (id, data) => {
    return Slot.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
    );
};

const deleteSlot = (id) => {
    return Slot.findByIdAndDelete(id);
};

module.exports = {
    getAllSlots,
    getSlotById,
    createSlot,
    updateSlot,
    deleteSlot
};