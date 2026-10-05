const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");

const normalizeRole = (role) => {
    if (role === "Admin" || role === "administration") {
        return "Administrator";
    }
    return role;
};

const sanitizeUser = (user) => {
    const userObj = user.toObject ? user.toObject() : { ...user };
    delete userObj.password;
    userObj.role = normalizeRole(userObj.role);
    return userObj;
};

const login = async (email, password) => {
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    let isMatch = false;

    if (user.password.startsWith("$2a$") || user.password.startsWith("$2b$")) {
        isMatch = await bcrypt.compare(password, user.password);
    } else {
        // Plain text compatibility check for existing legacy users
        if (user.password === password) {
            isMatch = true;
            // Upgrade legacy plain-text password to bcrypt hash silently
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            await user.save();
        }
    }

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const effectiveRole = normalizeRole(user.role);

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: effectiveRole
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    return {
        token,
        user: sanitizeUser(user)
    };
};

const registerUser = async (userData, requestingUser = null) => {
    const { full_name, email, password, role = "Barber", phone } = userData;

    if (!full_name || !email || !password || !phone) {
        const error = new Error("full_name, email, password, and phone are required");
        error.statusCode = 400;
        throw error;
    }

    const targetRole = normalizeRole(role);
    const validRoles = ["Administrator", "Receptionist", "Barber"];

    if (!validRoles.includes(targetRole)) {
        const error = new Error(`Invalid role. Allowed roles: ${validRoles.join(", ")}`);
        error.statusCode = 400;
        throw error;
    }

    // Security check: Unauthenticated users cannot register Administrator or Receptionist accounts freely
    if (targetRole === "Administrator" || targetRole === "Receptionist") {
        const requesterRole = requestingUser ? normalizeRole(requestingUser.role) : null;
        if (requesterRole !== "Administrator") {
            const error = new Error("Registration of privileged roles (Administrator, Receptionist) requires Administrator authorization.");
            error.statusCode = 403;
            throw error;
        }
    }

    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
        const error = new Error("User already exists with this email");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser({
        full_name,
        email,
        password: hashedPassword,
        role: targetRole,
        phone
    });

    return sanitizeUser(user);
};

module.exports = {
    login,
    registerUser
};