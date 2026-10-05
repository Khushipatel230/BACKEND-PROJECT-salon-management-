const Customer = require("../models/customerModel");

// GET ALL CUSTOMERS
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET CUSTOMER BY ID
const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: "Customer Not Found" });
        }

        res.json(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ADD CUSTOMER
const addCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();

        res.status(201).json({
            message: "Customer Added Successfully",
            customer
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE CUSTOMER
const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!customer) {
            return res.status(404).json({ message: "Customer Not Found" });
        }

        res.json({
            message: "Customer Updated Successfully",
            customer
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE CUSTOMER
const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: "Customer Not Found" });
        }

        res.json({
            message: "Customer Deleted Successfully"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllCustomers,
    addCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};