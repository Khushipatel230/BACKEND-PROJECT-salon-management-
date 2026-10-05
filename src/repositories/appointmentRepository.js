
const Appointment = require("../models/appointmentModel");

// Get all appointments
const getAllAppointments = () => {
    return Appointment.find()
        .populate("customer_id")
        .populate("service_id")
        .populate("barber_id");
};

// Get appointment by ID
const getAppointmentById = (id) => {
    return Appointment.findById(id)
        .populate("customer_id")
        .populate("service_id")
        .populate("barber_id");
};

// Find conflicting appointment
const findConflict = async (
    barber_id,
    appointment_date,
    start_time,
    end_time,
    excludeId = null
) => {
    const query = {
        barber_id,
        appointment_date: new Date(appointment_date),
        status: { $ne: "Cancelled" }
    };

    // Ignore current appointment during update
    if (excludeId) {
        query._id = { $ne: excludeId };
    }

    const appointments = await Appointment.find(query);

    const [startHour, startMinute] = start_time.split(":").map(Number);
    const [endHour, endMinute] = end_time.split(":").map(Number);

    const newStartMinutes = startHour * 60 + startMinute;
    const newEndMinutes = endHour * 60 + endMinute;

    const conflict = appointments.find((appointment) => {
        const [oldStartHour, oldStartMinute] =
            appointment.start_time.split(":").map(Number);

        const [oldEndHour, oldEndMinute] =
            appointment.end_time.split(":").map(Number);

        const oldStartMinutes =
            oldStartHour * 60 + oldStartMinute;

        const oldEndMinutes =
            oldEndHour * 60 + oldEndMinute;

        return (
            newStartMinutes < oldEndMinutes &&
            newEndMinutes > oldStartMinutes
        );
    });

    return conflict || null;
};

// Create appointment
const createAppointment = (data) => {
    return Appointment.create(data);
};

// Update appointment
const updateAppointment = (id, data) => {
    return Appointment.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

// Delete appointment
const deleteAppointment = (id) => {
    return Appointment.findByIdAndDelete(id);
};

module.exports = {
    getAllAppointments,
    getAppointmentById,
    findConflict,
    createAppointment,
    updateAppointment,
    deleteAppointment
};