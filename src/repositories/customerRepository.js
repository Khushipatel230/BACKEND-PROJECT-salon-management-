const Customer = require("../models/customerModel");

const getAllCustomers = () => {
    return Customer.find();
};

const getCustomerById = (id) => {
    return Customer.findById(id);
};

const createCustomer = (data) => {
    return Customer.create(data);
};

const updateCustomer = (id, data) => {
    return Customer.findByIdAndUpdate(
        id,
        data,
        { new: true }
    );
};

const deleteCustomer = (id) => {
    return Customer.findByIdAndDelete(id);
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};