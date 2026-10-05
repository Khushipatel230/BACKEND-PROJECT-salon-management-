const barberService = require("../services/barberService");

// GET ALL BARBERS
const getAllBarbers = async (req, res) => {
    try {
        const barbers = await barberService.getAllBarbers();

        res.json(barbers);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// GET BARBER BY ID
const getBarberById = async (req, res) => {
    try {
        const barber = await barberService.getBarberById(req.params.id);

        if (!barber) {
            return res.status(404).json({
                message: "Barber Not Found"
            });
        }

        res.json(barber);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// ADD BARBER
const addBarber = async (req, res) => {
    try {
        const barber = await barberService.addBarber(req.body);

        res.status(201).json({
            message: "Barber Added Successfully",
            barber
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// UPDATE BARBER
const updateBarber = async (req, res) => {
    try {
        const barber = await barberService.updateBarber(
            req.params.id,
            req.body
        );

        if (!barber) {
            return res.status(404).json({
                message: "Barber Not Found"
            });
        }

        res.json({
            message: "Barber Updated Successfully",
            barber
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// DELETE BARBER
const deleteBarber = async (req, res) => {
    try {
        const barber = await barberService.deleteBarber(req.params.id);

        if (!barber) {
            return res.status(404).json({
                message: "Barber Not Found"
            });
        }

        res.json({
            message: "Barber Deleted Successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getAllBarbers,
    getBarberById,
    addBarber,
    updateBarber,
    deleteBarber
};