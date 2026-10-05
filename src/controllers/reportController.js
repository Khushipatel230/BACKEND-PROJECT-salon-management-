const reportService = require("../services/reportService");

// Daily Revenue
const getDailyRevenue = async (req, res) => {
    try {

        const result =
            await reportService.getDailyRevenue(
                req.query.date
            );

        res.json({
            message: "Daily Revenue Report",
            data: result
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};


// Monthly Revenue
const getMonthlyRevenue = async (req, res) => {
    try {

        const result =
            await reportService.getMonthlyRevenue(
                req.query.month
            );

        res.json({
            message: "Monthly Revenue Report",
            data: result
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};


// Top Services
const getTopServices = async (req, res) => {
    try {

        const result =
            await reportService.getTopServices();

        res.json({
            message: "Top Services Report",
            data: result
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};


// Barber Performance
const getBarberPerformance = async (req, res) => {
    try {

        const result =
            await reportService.getBarberPerformance();

        res.json({
            message: "Barber Performance Report",
            data: result
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};


// Customer Visits
const getCustomerVisits = async (req, res) => {
    try {

        const result =
            await reportService.getCustomerVisits();

        res.json({
            message: "Customer Visits Report",
            data: result
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};


module.exports = {
    getDailyRevenue,
    getMonthlyRevenue,
    getTopServices,
    getBarberPerformance,
    getCustomerVisits
};