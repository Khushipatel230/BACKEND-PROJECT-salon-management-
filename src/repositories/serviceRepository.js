const Service = require("../models/serviceModel");

// Get all services
const getAllServices = () => {
    return Service.find();
};

// Get service by ID
const getServiceById = (id) => {
    return Service.findById(id);
};

// Add service
const createService = (data) => {
    return Service.create(data);
};

// Update service
const updateService = (id, data) => {
    return Service.findByIdAndUpdate(
        id,
        data,
        { new: true }
    );
};

// Delete service
const deleteService = (id) => {
    return Service.findByIdAndDelete(id);
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};