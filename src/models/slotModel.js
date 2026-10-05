const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
    barber_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Barber",
        required: true
    },

    day: {
        type: String,
        required: true,
        enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]
    },

    start_time: {
        type: String,
        required: function () {
            return this.is_holiday !== true;
        }
    },

    end_time: {
        type: String,
        required: function () {
            return this.is_holiday !== true;
        }
    },

    is_holiday: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

slotSchema.index({ barber_id: 1, day: 1 });

module.exports = mongoose.model("Slot", slotSchema);