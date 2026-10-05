const express = require("express");

const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const validateBarber = require("../validations/barberValidation");

const router = express.Router();

const {
    getAllBarbers,
    getBarberById,
    addBarber,
    updateBarber,
    deleteBarber
} = require("../controllers/barberController");

// Manage Barbers / Stylist Profiling - Administrator only
router.get("/", verifyToken, authorizeRoles("Administrator"), getAllBarbers);

router.post(
    "/",
    verifyToken,
    authorizeRoles("Administrator"),
    validateBarber,
    addBarber
);

router.get("/:id", verifyToken, authorizeRoles("Administrator"), getBarberById);

router.put("/:id", verifyToken, authorizeRoles("Administrator"), updateBarber);

router.delete("/:id", verifyToken, authorizeRoles("Administrator"), deleteBarber);

module.exports = router;