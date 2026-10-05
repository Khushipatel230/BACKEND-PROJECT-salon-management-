const attendanceRepository = require("../repositories/attendanceRepository");

// GET ALL ATTENDANCE
const getAllAttendance = () => {
    return attendanceRepository.getAllAttendance();
};

// GET ATTENDANCE BY ID
const getAttendanceById = (id) => {
    return attendanceRepository.getAttendanceById(id);
};

// CHECK-IN
const checkIn = async (barber_id, date, user) => {

    // Barber can mark only his own attendance
    if (user.role === "Barber") {

        const barber = await attendanceRepository.getBarberByUserId(
            user.id
        );

        if (!barber) {
            throw new Error("Barber profile not found.");
        }

        if (barber._id.toString() !== barber_id.toString()) {
            throw new Error(
                "Barber can mark only his own attendance."
            );
        }
    }

    const existing =
        await attendanceRepository.findByBarberAndDate(
            barber_id,
            date
        );

    if (existing) {
        throw new Error(
            "Attendance already exists for this barber on this date."
        );
    }

    return attendanceRepository.createAttendance({
        barber_id,
        date,
        status: "Present",
        check_in: new Date()
    });
};

// CHECK-OUT
const checkOut = async (id, user) => {

    const attendance =
        await attendanceRepository.getAttendanceById(id);

    if (!attendance) {
        throw new Error("Attendance record not found.");
    }

    // Barber can checkout only his own attendance
    if (user.role === "Barber") {

        const barber =
            await attendanceRepository.getBarberByUserId(user.id);

        if (!barber) {
            throw new Error("Barber profile not found.");
        }

        if (
            attendance.barber_id.toString() !==
            barber._id.toString()
        ) {
            throw new Error(
                "Barber can checkout only his own attendance."
            );
        }
    }

    if (!attendance.check_in) {
        throw new Error(
            "Barber has not checked in yet."
        );
    }

    if (attendance.check_out) {
        throw new Error(
            "Barber has already checked out."
        );
    }

    const checkOutTime = new Date();

    return attendanceRepository.updateAttendance(
        id,
        {
            check_out: checkOutTime
        }
    );
};

// DELETE ATTENDANCE
const deleteAttendance = (id) => {
    return attendanceRepository.deleteAttendance(id);
};

module.exports = {
    getAllAttendance,
    getAttendanceById,
    checkIn,
    checkOut,
    deleteAttendance
};