const wageRepository = require("../repositories/wageRepository");
const Appointment = require("../models/appointmentModel");
const Service = require("../models/serviceModel");
const Barber = require("../models/barberModel");

// Get all wages
const getAllWages = async (user = null) => {
    const wages = await wageRepository.getAllWages();
    if (user && user.role === "Barber") {
        const barberProfiles = await Barber.find({ user_id: user.id });
        const barberProfileIds = barberProfiles.map((b) => b._id.toString());
        return wages.filter((w) => {
            const bId = w.barber_id?._id ? w.barber_id._id.toString() : w.barber_id?.toString();
            return barberProfileIds.includes(bId);
        });
    }
    return wages;
};

// Get wage by ID
const getWageById = async (id, user = null) => {
    const wage = await wageRepository.getWageById(id);
    if (!wage) return null;
    if (user && user.role === "Barber") {
        const barberProfiles = await Barber.find({ user_id: user.id });
        const barberProfileIds = barberProfiles.map((b) => b._id.toString());
        const bId = wage.barber_id?._id ? wage.barber_id._id.toString() : wage.barber_id?.toString();
        if (!barberProfileIds.includes(bId)) {
            const error = new Error("Access Denied. You can view only your own wage information.");
            error.statusCode = 403;
            throw error;
        }
    }
    return wage;
};

// Create wage
const createWage = async (data) => {

    const {
        barber_id,
        appointment_id,
        salary = 0
    } = data;

    // Find barber
    let barber = await Barber.findById(barber_id);

    if (!barber) {
        barber = await Barber.findOne({
            user_id: barber_id
        });
    }

    if (!barber) {
        throw new Error("Barber not found.");
    }

    // Find appointment
    const appointment =
        await Appointment.findById(appointment_id);

    if (!appointment) {
        throw new Error("Appointment not found.");
    }

    // Appointment barber_id is User ID
    if (
        appointment.barber_id.toString() !==
        barber.user_id.toString()
    ) {
        throw new Error(
            "Appointment does not belong to this barber."
        );
    }

    // Find service
    const service =
        await Service.findById(
            appointment.service_id
        );

    if (!service) {
        throw new Error("Service not found.");
    }

    // Prevent duplicate wage
    const existing =
        await wageRepository.findByAppointment(
            appointment_id
        );

    if (existing) {
        throw new Error(
            "Wage record already exists for this appointment."
        );
    }

    // Service price
    const serviceAmount = Number(
        service.price || service.amount || 0
    );

    // Commission percentage
    const commissionPercentage =
        Number(barber.commission_percentage);

    // Salary
    const salaryAmount = Number(salary);

    if (
        isNaN(serviceAmount) ||
        serviceAmount < 0
    ) {
        throw new Error(
            "Invalid service amount."
        );
    }

    if (
        isNaN(commissionPercentage) ||
        commissionPercentage < 0 ||
        commissionPercentage > 100
    ) {
        throw new Error(
            "Invalid commission percentage."
        );
    }

    if (
        isNaN(salaryAmount) ||
        salaryAmount < 0
    ) {
        throw new Error(
            "Invalid salary."
        );
    }

    // Calculate barber commission
    const barberCommission =
        serviceAmount *
        commissionPercentage /
        100;

    // Salon retained amount
    const salonAmount =
        serviceAmount -
        barberCommission;

    // Total payroll amount
    const totalAmount =
        salaryAmount +
        barberCommission;

    // Get month from appointment date
    const appointmentDate =
        new Date(appointment.appointment_date);

    const year =
        appointmentDate.getFullYear();

    const monthNumber =
        String(
            appointmentDate.getMonth() + 1
        ).padStart(2, "0");

    const month =
        `${year}-${monthNumber}`;

    return wageRepository.createWage({
        barber_id: barber._id,
        appointment_id: appointment_id,

        month: month,

        salary: salaryAmount,

        service_amount: serviceAmount,

        commission_percentage:
            commissionPercentage,

        barber_commission:
            Number(
                barberCommission.toFixed(2)
            ),

        salon_amount:
            Number(
                salonAmount.toFixed(2)
            ),

        total_amount:
            Number(
                totalAmount.toFixed(2)
            )
    });
};


// Update wage
const updateWage = async (id, data) => {

    // Find existing wage
    const wage =
        await wageRepository.getWageById(id);

    if (!wage) {
        throw new Error(
            "Wage record not found."
        );
    }

    // Get salary
    const salaryAmount =
        data.salary !== undefined
            ? Number(data.salary)
            : Number(wage.salary || 0);

    // Validate salary
    if (
        isNaN(salaryAmount) ||
        salaryAmount < 0
    ) {
        throw new Error(
            "Invalid salary."
        );
    }

    // Existing barber commission
    const barberCommission =
        Number(
            wage.barber_commission || 0
        );

    // Recalculate total amount
    const totalAmount =
        salaryAmount +
        barberCommission;

    const updateData = {
        salary: salaryAmount,

        total_amount:
            Number(
                totalAmount.toFixed(2)
            )
    };

    return wageRepository.updateWage(
        id,
        updateData
    );
};


// Delete wage
const deleteWage = (id) => {
    return wageRepository.deleteWage(id);
};


module.exports = {
    getAllWages,
    getWageById,
    createWage,
    updateWage,
    deleteWage
};