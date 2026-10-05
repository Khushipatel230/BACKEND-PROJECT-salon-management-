const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },

    barber_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },

    appointment_date: {
        type: Date,
        required: true
    },

    start_time: {
        type: String,
        required: true
    },

    end_time: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
        default: "Pending"
    },

    remarks: {
        type: String
    }
}, {
    timestamps: true
});

appointmentSchema.index({ barber_id: 1, appointment_date: 1 });
appointmentSchema.index({ customer_id: 1 });
appointmentSchema.index({ service_id: 1 });

module.exports = mongoose.model("Appointment", appointmentSchema);