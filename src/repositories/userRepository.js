const User = require("../models/userModel");

const findUserByEmail = (email) => {
    return User.findOne({ email });
};

const createUser = (data) => {
    return User.create(data);
};

module.exports = {
    findUserByEmail,
    createUser
};