const serviceRepository = require("../repositories/serviceRepository");

// Get all services
const getAllServices = () => {
    return serviceRepository.getAllServices();
};

// Get service by ID
const getServiceById = (id) => {
    return serviceRepository.getServiceById(id);
};

// Add service
const addService = async (data) => {

    const existingServices = await serviceRepository.getAllServices();

    const serviceExists = existingServices.some(
        (service) =>
            service.service_name.toLowerCase().trim() ===
            data.service_name.toLowerCase().trim()
    );

    if (serviceExists) {
        throw new Error("Service already exists.");
    }

    return serviceRepository.createService(data);
};

// Update service
const updateService = (id, data) => {
    return serviceRepository.updateService(id, data);
};

// Delete service
const deleteService = (id) => {
    return serviceRepository.deleteService(id);
};

module.exports = {
    getAllServices,
    getServiceById,
    addService,
    updateService,
    deleteService
};