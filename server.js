require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./src/docs/swagger");

const app = express();

// MongoDB Connection
require("./src/config/db");

// Middleware
app.use(express.json());

// Swagger UI Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
const customerRoutes = require("./src/routes/customerRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");
const appointmentRoutes = require("./src/routes/appointmentRoutes");
const loginRoutes = require("./src/routes/loginRoutes");
const barberRoutes = require("./src/routes/barberRoutes");
const slotRoutes = require("./src/routes/slotRoutes");
const attendanceRoutes = require("./src/routes/attendanceRoutes");
const wageRoutes = require("./src/routes/wageRoutes");
const reportRoutes = require("./src/routes/reportRoutes");

// API Routes
app.use("/customers", customerRoutes);
app.use("/services", serviceRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/login", loginRoutes);
app.use("/barbers", barberRoutes);
app.use("/slots", slotRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/wages", wageRoutes);
app.use("/reports", reportRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Salon Management API Running. View documentation at <a href='/api-docs'>/api-docs</a>");
});

// Global Error Handler (Clean JSON responses without leaking stack traces or secrets)
app.use((err, req, res, next) => {
    console.error("Global Error:", err.message);
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
        message: err.message || "Internal Server Error"
    });
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});