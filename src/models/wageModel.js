const mongoose = require("mongoose");

const wageSchema = new mongoose.Schema(
    {
        barber_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Barber",
            required: true
        },

        appointment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required: true
        },

        // Payroll month
        // Example: 2026-09
        month: {
            type: String,
            required: true
        },

        // Fixed salary
        salary: {
            type: Number,
            default: 0,
            min: 0
        },

        service_amount: {
            type: Number,
            required: true,
            min: 0
        },

        commission_percentage: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },

        barber_commission: {
            type: Number,
            required: true,
            min: 0
        },

        salon_amount: {
            type: Number,
            required: true,
            min: 0
        },

        // Salary + commission
        total_amount: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

wageSchema.index({ appointment_id: 1 });
wageSchema.index({ barber_id: 1, month: 1 });

module.exports = mongoose.model("Wage", wageSchema);