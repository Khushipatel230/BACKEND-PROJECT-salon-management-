const express = require("express");

const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const {
    getAllWages,
    getWageById,
    createWage,
    updateWage,
    deleteWage
} = require("../controllers/wageController");

const router = express.Router();

// GET ALL WAGES - Administrator & Barber (Barber sees only personal wage records)
router.get(
    "/",
    verifyToken,
    authorizeRoles("Administrator", "Barber"),
    getAllWages
);

// GET WAGE BY ID - Administrator & Barber (Barber sees only personal wage record)
router.get(
    "/:id",
    verifyToken,
    authorizeRoles("Administrator", "Barber"),
    getWageById
);

// CREATE WAGE - Administrator only
router.post(
    "/",
    verifyToken,
    authorizeRoles("Administrator"),
    createWage
);

// UPDATE WAGE - Administrator only
router.put(
    "/:id",
    verifyToken,
    authorizeRoles("Administrator"),
    updateWage
);

// DELETE WAGE - Administrator only
router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("Administrator"),
    deleteWage
);

module.exports = router;