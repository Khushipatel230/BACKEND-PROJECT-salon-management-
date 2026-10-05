const attendanceService = require("../services/attendanceService");

// GET ALL ATTENDANCE
const getAllAttendance = async (req, res) => {
    try {
        const attendance = await attendanceService.getAllAttendance();

        res.json(attendance);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// GET ATTENDANCE BY ID
const getAttendanceById = async (req, res) => {
    try {
        const attendance =
            await attendanceService.getAttendanceById(req.params.id);

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance Not Found"
            });
        }

        res.json(attendance);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// CHECK-IN
const checkIn = async (req, res) => {
    try {
        const { barber_id, date } = req.body;

        if (!barber_id || !date) {
            return res.status(400).json({
                message: "Barber ID and date are required"
            });
        }

        const attendance = await attendanceService.checkIn(
            barber_id,
            date,
            req.user
        );

        res.status(201).json({
            message: "Check-in Successful",
            attendance
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

// CHECK-OUT
const checkOut = async (req, res) => {
    try {
        const attendance =
            await attendanceService.checkOut(
                req.params.id,
                req.user
            );

        res.json({
            message: "Check-out Successful",
            attendance
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

// DELETE ATTENDANCE
const deleteAttendance = async (req, res) => {
    try {
        const attendance =
            await attendanceService.deleteAttendance(req.params.id);

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance Not Found"
            });
        }

        res.json({
            message: "Attendance Deleted Successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getAllAttendance,
    getAttendanceById,
    checkIn,
    checkOut,
    deleteAttendance
};