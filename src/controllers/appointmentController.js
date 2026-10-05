
const Appointment = require("../models/appointmentModel");
const appointmentService = require("../services/appointmentService");

// GET ALL APPOINTMENTS
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("customer_id")
            .populate("service_id")
            .populate("barber_id");

        res.json(appointments);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// GET APPOINTMENT BY ID
const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate("customer_id")
            .populate("service_id")
            .populate("barber_id");

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment Not Found"
            });
        }

        res.json(appointment);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// ADD APPOINTMENT
const addAppointment = async (req, res) => {
    try {
        const appointment =
            await appointmentService.addAppointment(req.body);

        res.status(201).json({
            message: "Appointment Added Successfully",
            appointment
        });
    } catch (err) {
        if (
            err.message ===
            "Barber already has an appointment at this time."
        ) {
            return res.status(409).json({
                message: err.message
            });
        }

        if (
            err.message ===
            "End time must be after start time."
        ) {
            return res.status(400).json({
                message: err.message
            });
        }

        res.status(400).json({
            message: err.message
        });
    }
};

// UPDATE APPOINTMENT
const updateAppointment = async (req, res) => {
    try {
        const appointment =
            await appointmentService.updateAppointment(
                req.params.id,
                req.body
            );

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment Not Found"
            });
        }

        res.json({
            message: "Appointment Updated Successfully",
            appointment
        });
    } catch (err) {
        if (
            err.message ===
            "Barber already has another appointment at this time."
        ) {
            return res.status(409).json({
                message: err.message
            });
        }

        if (
            err.message ===
            "End time must be after start time."
        ) {
            return res.status(400).json({
                message: err.message
            });
        }

        res.status(400).json({
            message: err.message
        });
    }
};

// DELETE APPOINTMENT
const deleteAppointment = async (req, res) => {
    try {
        const appointment =
            await Appointment.findByIdAndDelete(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment Not Found"
            });
        }

        res.json({
            message: "Appointment Deleted Successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getAllAppointments,
    addAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};