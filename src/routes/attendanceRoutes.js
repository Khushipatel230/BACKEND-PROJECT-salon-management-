const express = require("express");

const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const {
    getAllAttendance,
    getAttendanceById,
    checkIn,
    checkOut,
    deleteAttendance
} = require("../controllers/attendanceController");

const router = express.Router();

// Attendance Review & Registration
// GET ALL ATTENDANCE - Administrator only
router.get(
    "/",
    verifyToken,
    authorizeRoles("Administrator"),
    getAllAttendance
);

// GET ATTENDANCE BY ID - Administrator only
router.get(
    "/:id",
    verifyToken,
    authorizeRoles("Administrator"),
    getAttendanceById
);

// CHECK-IN - Administrator & Barber (Barber can mark personal attendance only)
router.post(
    "/checkin",
    verifyToken,
    authorizeRoles("Administrator", "Barber"),
    checkIn
);

// CHECK-OUT - Administrator & Barber (Barber can checkout personal attendance only)
router.post(
    "/checkout/:id",
    verifyToken,
    authorizeRoles("Administrator", "Barber"),
    checkOut
);

// DELETE ATTENDANCE - Administrator only
router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("Administrator"),
    deleteAttendance
);

module.exports = router;