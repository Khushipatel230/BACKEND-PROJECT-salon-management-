const express = require("express");

const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const {
    getDailyRevenue,
    getMonthlyRevenue,
    getTopServices,
    getBarberPerformance,
    getCustomerVisits
} = require("../controllers/reportController");

const router = express.Router();

// Corporate Dashboard Reporting Endpoints - Administrator only
router.get(
    "/daily-revenue",
    verifyToken,
    authorizeRoles("Administrator"),
    getDailyRevenue
);

router.get(
    "/monthly-revenue",
    verifyToken,
    authorizeRoles("Administrator"),
    getMonthlyRevenue
);

router.get(
    "/top-services",
    verifyToken,
    authorizeRoles("Administrator"),
    getTopServices
);

router.get(
    "/barber-performance",
    verifyToken,
    authorizeRoles("Administrator"),
    getBarberPerformance
);

router.get(
    "/customer-visits",
    verifyToken,
    authorizeRoles("Administrator"),
    getCustomerVisits
);

module.exports = router;