const express = require("express");

const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const validateAppointment = require("../validations/appointmentValidation");

const router = express.Router();

const {
    getAllAppointments,
    addAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
} = require("../controllers/appointmentController");

// Appointment Lifecycle Administration - Administrator & Receptionist
router.get(
    "/",
    verifyToken,
    authorizeRoles("Administrator", "Receptionist"),
    getAllAppointments
);

router.post(
    "/",
    verifyToken,
    authorizeRoles("Administrator", "Receptionist"),
    validateAppointment,
    addAppointment
);

router.get(
    "/:id",
    verifyToken,
    authorizeRoles("Administrator", "Receptionist"),
    getAppointmentById
);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("Administrator", "Receptionist"),
    updateAppointment
);

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("Administrator", "Receptionist"),
    deleteAppointment
);

module.exports = router;