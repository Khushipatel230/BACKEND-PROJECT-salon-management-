const barberRepository = require("../repositories/barberRepository");

const getAllBarbers = () => {
    return barberRepository.getAllBarbers();
};

const getBarberById = (id) => {
    return barberRepository.getBarberById(id);
};

const addBarber = (data) => {
    return barberRepository.createBarber(data);
};

const updateBarber = (id, data) => {
    return barberRepository.updateBarber(id, data);
};

const deleteBarber = (id) => {
    return barberRepository.deleteBarber(id);
};

module.exports = {
    getAllBarbers,
    getBarberById,
    addBarber,
    updateBarber,
    deleteBarber
};