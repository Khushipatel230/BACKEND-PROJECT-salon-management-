const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const router = express.Router();

const {
    getAllCustomers,
    addCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customerController");

// View customers - Administrator & Receptionist
router.get("/", verifyToken, authorizeRoles("Administrator", "Receptionist"), getAllCustomers);
router.get("/:id", verifyToken, authorizeRoles("Administrator", "Receptionist"), getCustomerById);

// Manage customers - Administrator only
router.post("/", verifyToken, authorizeRoles("Administrator"), addCustomer);
router.put("/:id", verifyToken, authorizeRoles("Administrator"), updateCustomer);
router.delete("/:id", verifyToken, authorizeRoles("Administrator"), deleteCustomer);

module.exports = router;