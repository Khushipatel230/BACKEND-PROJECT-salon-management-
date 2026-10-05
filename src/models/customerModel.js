const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    }
}, {
    timestamps: true
});

customerSchema.index({ phone: 1 });
customerSchema.index({ email: 1 });

module.exports = mongoose.model("Customer", customerSchema);