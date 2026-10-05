const slotRepository = require("../repositories/slotRepository");

const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

const isValidTime = (time) => {
    return typeof time === "string" &&
        /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
};

const getAllSlots = () => {
    return slotRepository.getAllSlots();
};

const getSlotById = (id) => {
    return slotRepository.getSlotById(id);
};

const checkConflict = async (
    barber_id,
    day,
    start_time,
    end_time,
    excludeId = null
) => {
    const existingSlots = await slotRepository.getAllSlots();

    const startMinutes = timeToMinutes(start_time);
    const endMinutes = timeToMinutes(end_time);

    return existingSlots.find((slot) => {
        if (excludeId && slot._id.toString() === excludeId.toString()) {
            return false;
        }

        if (!slot.barber_id || slot.is_holiday === true) {
            return false;
        }

        if (slot.barber_id.toString() !== barber_id.toString()) {
            return false;
        }

        if (slot.day.toLowerCase() !== day.toLowerCase()) {
            return false;
        }

        if (!slot.start_time || !slot.end_time) {
            return false;
        }

        const existingStart = timeToMinutes(slot.start_time);
        const existingEnd = timeToMinutes(slot.end_time);

        return (
            startMinutes < existingEnd &&
            endMinutes > existingStart
        );
    });
};

const addSlot = async (data) => {
    const {
        barber_id,
        day,
        start_time,
        end_time,
        is_holiday = false
    } = data;

    if (!barber_id || !day) {
        throw new Error("Barber ID and day are required.");
    }

    if (is_holiday === true) {
        return slotRepository.createSlot({
            barber_id,
            day,
            is_holiday: true
        });
    }

    if (!start_time || !end_time) {
        throw new Error("Start time and end time are required.");
    }

    if (!isValidTime(start_time) || !isValidTime(end_time)) {
        throw new Error(
            "Time must be in HH:mm format, for example 09:00 or 18:30."
        );
    }

    if (timeToMinutes(end_time) <= timeToMinutes(start_time)) {
        throw new Error("End time must be after start time.");
    }

    const conflict = await checkConflict(
        barber_id,
        day,
        start_time,
        end_time
    );

    if (conflict) {
        const error = new Error("Barber already has a slot at this time.");
        error.statusCode = 409;
        throw error;
    }

    return slotRepository.createSlot({
        barber_id,
        day,
        start_time,
        end_time,
        is_holiday: false
    });
};

const updateSlot = async (id, data) => {
    const {
        barber_id,
        day,
        start_time,
        end_time,
        is_holiday = false
    } = data;

    if (!barber_id || !day) {
        throw new Error("Barber ID and day are required.");
    }

    if (is_holiday === true) {
        return slotRepository.updateSlot(id, {
            barber_id,
            day,
            is_holiday: true
        });
    }

    if (!start_time || !end_time) {
        throw new Error("Start time and end time are required.");
    }

    if (!isValidTime(start_time) || !isValidTime(end_time)) {
        throw new Error(
            "Time must be in HH:mm format, for example 09:00 or 18:30."
        );
    }

    if (timeToMinutes(end_time) <= timeToMinutes(start_time)) {
        throw new Error("End time must be after start time.");
    }

    const conflict = await checkConflict(
        barber_id,
        day,
        start_time,
        end_time,
        id
    );

    if (conflict) {
        const error = new Error("Barber already has a slot at this time.");
        error.statusCode = 409;
        throw error;
    }

    return slotRepository.updateSlot(id, {
        barber_id,
        day,
        start_time,
        end_time,
        is_holiday: false
    });
};

const deleteSlot = (id) => {
    return slotRepository.deleteSlot(id);
};

module.exports = {
    getAllSlots,
    getSlotById,
    addSlot,
    updateSlot,
    deleteSlot
};