const mongoose = require("mongoose");

const barberSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    specialization: {
        type: String
    },

    commission_percentage: {
        type: Number,
        required: true
    },

    joining_date: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

barberSchema.index({ user_id: 1 });

module.exports = mongoose.model("Barber", barberSchema);