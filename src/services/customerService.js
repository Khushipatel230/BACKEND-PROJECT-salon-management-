const customerRepository = require("../repositories/customerRepository");

// Get all customers
const getAllCustomers = () => {
    return customerRepository.getAllCustomers();
};

// Get customer by ID
const getCustomerById = (id) => {
    return customerRepository.getCustomerById(id);
};

// Add customer
const addCustomer = (data) => {
    return customerRepository.createCustomer(data);
};
// const addCustomer = async (data) => {
//     const customers = await customerRepository.getAllCustomers();

//     const existingCustomer = customers.find(
//         (customer) =>
//             customer.email.toLowerCase() === data.email.toLowerCase() ||
//             customer.phone === data.phone
//     );

//     if (existingCustomer) {
//         throw new Error("Customer with this email or phone already exists");
//     }

//     return customerRepository.createCustomer(data);
// };
// Update customer
const updateCustomer = (id, data) => {
    return customerRepository.updateCustomer(id, data);
};

// Delete customer
const deleteCustomer = (id) => {
    return customerRepository.deleteCustomer(id);
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer
};