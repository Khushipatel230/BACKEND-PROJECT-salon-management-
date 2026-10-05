const mongoose = require("mongoose");
const slotService = require("../services/slotService");

const getAllSlots = async (req, res) => {
    try {
        const slots = await slotService.getAllSlots();
        res.json(slots);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSlotById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid slot ID"
            });
        }

        const slot = await slotService.getSlotById(req.params.id);

        if (!slot) {
            return res.status(404).json({
                message: "Slot Not Found"
            });
        }

        res.json(slot);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addSlot = async (req, res) => {
    try {
        const slot = await slotService.addSlot(req.body);

        res.status(201).json({
            message: "Slot Added Successfully",
            slot
        });
    } catch (err) {
        res.status(err.statusCode || 400).json({
            message: err.message
        });
    }
};

const updateSlot = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid slot ID"
            });
        }

        const slot = await slotService.updateSlot(
            req.params.id,
            req.body
        );

        if (!slot) {
            return res.status(404).json({
                message: "Slot Not Found"
            });
        }

        res.json({
            message: "Slot Updated Successfully",
            slot
        });
    } catch (err) {
        res.status(err.statusCode || 400).json({
            message: err.message
        });
    }
};

const deleteSlot = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid slot ID"
            });
        }

        const slot = await slotService.deleteSlot(req.params.id);

        if (!slot) {
            return res.status(404).json({
                message: "Slot Not Found"
            });
        }

        res.json({
            message: "Slot Deleted Successfully"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllSlots,
    getSlotById,
    addSlot,
    updateSlot,
    deleteSlot
};