const Attendance = require("../models/attendanceModel");
const Barber = require("../models/barberModel");

// GET ALL ATTENDANCE
const getAllAttendance = () => {
    return Attendance.find();
};

// GET ATTENDANCE BY ID
const getAttendanceById = (id) => {
    return Attendance.findById(id);
};

// FIND ATTENDANCE BY BARBER AND DATE
const findByBarberAndDate = (barber_id, date) => {
    return Attendance.findOne({
        barber_id: barber_id,
        date: date
    });
};

// CREATE ATTENDANCE
const createAttendance = (data) => {
    return Attendance.create(data);
};

// UPDATE ATTENDANCE
const updateAttendance = (id, data) => {
    return Attendance.findByIdAndUpdate(
        id,
        data,
        { new: true }
    );
};

// DELETE ATTENDANCE
const deleteAttendance = (id) => {
    return Attendance.findByIdAndDelete(id);
};

// GET BARBER BY USER ID
const getBarberByUserId = (userId) => {
    return Barber.findOne({
        user_id: userId
    });
};

module.exports = {
    getAllAttendance,
    getAttendanceById,
    findByBarberAndDate,
    createAttendance,
    updateAttendance,
    deleteAttendance,
    getBarberByUserId
};