
const appointmentRepository = require("../repositories/appointmentRepository");
const slotRepository = require("../repositories/slotRepository");

// Get all appointments
const getAllAppointments = () => {
    return appointmentRepository.getAllAppointments();
};

// Get appointment by ID
const getAppointmentById = (id) => {
    return appointmentRepository.getAppointmentById(id);
};

// Convert time to minutes
const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

// Add appointment
const addAppointment = async (data) => {
    const {
        barber_id,
        appointment_date,
        start_time,
        end_time
    } = data;

    // Check valid time
    const startMinutes = timeToMinutes(start_time);
    const endMinutes = timeToMinutes(end_time);

    if (startMinutes >= endMinutes) {
        throw new Error("End time must be after start time.");
    }

    // Check double booking
    const conflict = await appointmentRepository.findConflict(
        barber_id,
        appointment_date,
        start_time,
        end_time
    );

    if (conflict) {
        throw new Error(
            "Barber already has an appointment at this time."
        );
    }

    // Find day
    const date = new Date(appointment_date);

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const day = days[date.getUTCDay()];

    // Get barber slots
    const slots = await slotRepository.getAllSlots();

    const barberSlot = slots.find((slot) =>
        slot.barber_id &&
        slot.barber_id.toString() === barber_id.toString() &&
        slot.day === day
    );

    if (!barberSlot) {
        throw new Error(
            "Barber is not available on this day."
        );
    }

    // Holiday check
    if (barberSlot.is_holiday === true) {
        throw new Error(
            "Appointments are not allowed on this holiday."
        );
    }

    // Working-hours check
    const slotStartMinutes = timeToMinutes(barberSlot.start_time);
    const slotEndMinutes = timeToMinutes(barberSlot.end_time);

    if (
        startMinutes < slotStartMinutes ||
        endMinutes > slotEndMinutes
    ) {
        throw new Error(
            `Appointment must be within barber working hours (${barberSlot.start_time} - ${barberSlot.end_time}).`
        );
    }

    return appointmentRepository.createAppointment(data);
};

// Update appointment
const updateAppointment = async (id, data) => {
    const {
        barber_id,
        appointment_date,
        start_time,
        end_time
    } = data;

    // Check valid time
    const startMinutes = timeToMinutes(start_time);
    const endMinutes = timeToMinutes(end_time);

    if (startMinutes >= endMinutes) {
        throw new Error("End time must be after start time.");
    }

    // Check conflict excluding current appointment
    const conflict = await appointmentRepository.findConflict(
        barber_id,
        appointment_date,
        start_time,
        end_time,
        id
    );

    if (conflict) {
        throw new Error(
            "Barber already has another appointment at this time."
        );
    }

    return appointmentRepository.updateAppointment(id, data);
};

// Delete appointment
const deleteAppointment = (id) => {
    return appointmentRepository.deleteAppointment(id);
};

module.exports = {
    getAllAppointments,
    getAppointmentById,
    addAppointment,
    updateAppointment,
    deleteAppointment
};