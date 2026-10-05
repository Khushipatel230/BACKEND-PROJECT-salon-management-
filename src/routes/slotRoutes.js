const express = require("express");

const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const validateSlot = require("../validations/slotValidation");

const {
    getAllSlots,
    getSlotById,
    addSlot,
    updateSlot,
    deleteSlot
} = require("../controllers/slotController");

const router = express.Router();

// GET ALL SLOTS
router.get(
    "/",
    verifyToken,
    authorizeRoles("Administrator", "Receptionist"),
    getAllSlots
);

// GET SLOT BY ID
router.get(
    "/:id",
    verifyToken,
    authorizeRoles("Administrator", "Receptionist"),
    getSlotById
);

// ADD SLOT
router.post(
    "/",
    verifyToken,
    authorizeRoles("Administrator", "Receptionist"),
    validateSlot,
    addSlot
);

// UPDATE SLOT
router.put(
    "/:id",
    verifyToken,
    authorizeRoles("Administrator", "Receptionist"),
    validateSlot,
    updateSlot
);

// DELETE SLOT
router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("Administrator", "Receptionist"),
    deleteSlot
);

module.exports = router;