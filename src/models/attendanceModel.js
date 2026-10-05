const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
    {
        barber_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Barber",
            required: true
        },

        date: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["Present", "Absent", "Leave"],
            required: true
        },

        // DATETIME
        check_in: {
            type: Date,
            required: true
        },

        // DATETIME
        check_out: {
            type: Date,
            default: null
        },

        remarks: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

attendanceSchema.index({ barber_id: 1, date: 1 });

module.exports = mongoose.model("Attendance", attendanceSchema);