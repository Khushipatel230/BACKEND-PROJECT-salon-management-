const normalizeRole = (role) => {
    if (role === "Admin" || role === "administration") {
        return "Administrator";
    }
    return role;
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {

        // Check whether user is logged in
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const userRole = normalizeRole(req.user.role);

        // Check whether user's role is allowed
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                message: "Access Denied. You do not have permission."
            });
        }

        // If role is allowed, continue
        next();
    };
};

module.exports = authorizeRoles;