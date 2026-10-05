const wageService = require("../services/wageService");

// GET ALL WAGES
const getAllWages = async (req, res) => {
    try {
        const wages = await wageService.getAllWages(req.user);

        res.json(wages);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message
        });
    }
};

// GET WAGE BY ID
const getWageById = async (req, res) => {
    try {
        const wage = await wageService.getWageById(
            req.params.id,
            req.user
        );

        if (!wage) {
            return res.status(404).json({
                message: "Wage record not found"
            });
        }

        res.json(wage);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message
        });
    }
};

// CREATE WAGE
const createWage = async (req, res) => {
    try {
        const wage = await wageService.createWage(
            req.body
        );

        res.status(201).json({
            message: "Wage Calculated Successfully",
            wage
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

// UPDATE WAGE
const updateWage = async (req, res) => {
    try {
        const wage = await wageService.updateWage(
            req.params.id,
            req.body
        );

        if (!wage) {
            return res.status(404).json({
                message: "Wage record not found"
            });
        }

        res.json({
            message: "Wage Updated Successfully",
            wage
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

// DELETE WAGE
const deleteWage = async (req, res) => {
    try {
        const wage = await wageService.deleteWage(
            req.params.id
        );

        if (!wage) {
            return res.status(404).json({
                message: "Wage record not found"
            });
        }

        res.json({
            message: "Wage Deleted Successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getAllWages,
    getWageById,
    createWage,
    updateWage,
    deleteWage
};