const serviceService = require("../services/serviceService");

// GET ALL SERVICES
const getAllServices = async (req, res) => {
    try {
        const services = await serviceService.getAllServices();
        res.json(services);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// GET SERVICE BY ID
const getServiceById = async (req, res) => {
    try {
        const service = await serviceService.getServiceById(req.params.id);

        if (!service) {
            return res.status(404).json({
                message: "Service Not Found"
            });
        }

        res.json(service);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// ADD SERVICE
const addService = async (req, res) => {
    try {
        const service = await serviceService.addService(req.body);

        res.status(201).json({
            message: "Service Added Successfully",
            service
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// UPDATE SERVICE
const updateService = async (req, res) => {
    try {
        const service = await serviceService.updateService(
            req.params.id,
            req.body
        );

        if (!service) {
            return res.status(404).json({
                message: "Service Not Found"
            });
        }

        res.json({
            message: "Service Updated Successfully",
            service
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// DELETE SERVICE
const deleteService = async (req, res) => {
    try {
        const service = await serviceService.deleteService(req.params.id);

        if (!service) {
            return res.status(404).json({
                message: "Service Not Found"
            });
        }

        res.json({
            message: "Service Deleted Successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getAllServices,
    getServiceById,
    addService,
    updateService,
    deleteService
};