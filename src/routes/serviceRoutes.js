const express = require("express");

const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();

const {
    getAllServices,
    addService,
    getServiceById,
    updateService,
    deleteService
} = require("../controllers/serviceController");

// Service Catalog Adjustments - Administrator only
router.get(
    "/",
    verifyToken,
    authorizeRoles("Administrator"),
    getAllServices
);

router.post(
    "/",
    verifyToken,
    authorizeRoles("Administrator"),
    addService
);

router.get(
    "/:id",
    verifyToken,
    authorizeRoles("Administrator"),
    getServiceById
);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("Administrator"),
    updateService
);

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("Administrator"),
    deleteService
);

module.exports = router;