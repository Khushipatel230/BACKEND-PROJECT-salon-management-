    const mongoose = require("mongoose");

    const userSchema = new mongoose.Schema({
        full_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["Administrator", "Receptionist", "Barber", "Admin", "Customer", "administration"],
            default: "Administrator",
            required: true
        },
        phone: {
            type: String
        }
    }, {
        timestamps: true
    });

    module.exports = mongoose.model("User", userSchema);