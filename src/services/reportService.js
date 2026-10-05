const Appointment = require("../models/appointmentModel");
const Wage = require("../models/wageModel");
const Barber = require("../models/barberModel");


// =====================================================
// 1. DAILY REVENUE
// =====================================================

const getDailyRevenue = async (date) => {

    let startDate;
    let endDate;

    if (date) {

        startDate = new Date(date);

        endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);

    } else {

        const today = new Date();

        startDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        endDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
        );
    }

    const result = await Appointment.aggregate([

        {
            $match: {
                appointment_date: {
                    $gte: startDate,
                    $lt: endDate
                },
                status: {
                    $ne: "Cancelled"
                }
            }
        },

        {
            $lookup: {
                from: "wages",
                localField: "_id",
                foreignField: "appointment_id",
                as: "wage"
            }
        },

        {
            $unwind: {
                path: "$wage",
                preserveNullAndEmptyArrays: true
            }
        },

        {
            $group: {
                _id: null,

                totalRevenue: {
                    $sum: {
                        $ifNull: [
                            "$wage.service_amount",
                            0
                        ]
                    }
                },

                totalBarberCommission: {
                    $sum: {
                        $ifNull: [
                            "$wage.barber_commission",
                            0
                        ]
                    }
                },

                totalSalonRevenue: {
                    $sum: {
                        $ifNull: [
                            "$wage.salon_amount",
                            0
                        ]
                    }
                },

                totalAppointments: {
                    $sum: 1
                }
            }
        }
    ]);

    return result[0] || {

        totalRevenue: 0,

        totalBarberCommission: 0,

        totalSalonRevenue: 0,

        totalAppointments: 0
    };
};


// =====================================================
// 2. MONTHLY REVENUE
// =====================================================

const getMonthlyRevenue = async (month) => {

    let year;
    let monthNumber;

    if (month) {

        const parts = month.split("-");

        year = Number(parts[0]);

        monthNumber = Number(parts[1]);

    } else {

        const today = new Date();

        year = today.getFullYear();

        monthNumber = today.getMonth() + 1;
    }

    const startDate = new Date(
        year,
        monthNumber - 1,
        1
    );

    const endDate = new Date(
        year,
        monthNumber,
        1
    );

    const result = await Appointment.aggregate([

        {
            $match: {

                appointment_date: {
                    $gte: startDate,
                    $lt: endDate
                },

                status: {
                    $ne: "Cancelled"
                }
            }
        },

        {
            $lookup: {

                from: "wages",

                localField: "_id",

                foreignField: "appointment_id",

                as: "wage"
            }
        },

        {
            $unwind: {

                path: "$wage",

                preserveNullAndEmptyArrays: true
            }
        },

        {
            $group: {

                _id: null,

                totalRevenue: {

                    $sum: {

                        $ifNull: [
                            "$wage.service_amount",
                            0
                        ]
                    }
                },

                totalBarberCommission: {

                    $sum: {

                        $ifNull: [
                            "$wage.barber_commission",
                            0
                        ]
                    }
                },

                totalSalonRevenue: {

                    $sum: {

                        $ifNull: [
                            "$wage.salon_amount",
                            0
                        ]
                    }
                },

                totalAppointments: {
                    $sum: 1
                }
            }
        }
    ]);

    return {

        month:
            `${year}-${String(monthNumber).padStart(2, "0")}`,

        ...(result[0] || {

            totalRevenue: 0,

            totalBarberCommission: 0,

            totalSalonRevenue: 0,

            totalAppointments: 0
        })
    };
};


// =====================================================
// 3. TOP SERVICES
// =====================================================

const getTopServices = async () => {

    return Appointment.aggregate([

        {
            $match: {

                status: {
                    $ne: "Cancelled"
                }
            }
        },

        {
            $group: {

                _id: "$service_id",

                totalBookings: {
                    $sum: 1
                }
            }
        },

        {
            $lookup: {

                from: "services",

                localField: "_id",

                foreignField: "_id",

                as: "service"
            }
        },

        {
            $unwind: "$service"
        },

        {
            $project: {

                _id: 0,

                service_id: "$_id",

                service_name:
                    "$service.service_name",

                totalBookings: 1
            }
        },

        {
            $sort: {
                totalBookings: -1
            }
        }
    ]);
};


// =====================================================
// 4. BARBER PERFORMANCE
// =====================================================

const getBarberPerformance = async () => {

    // Get all non-cancelled appointments
    const appointments = await Appointment.find({

        status: {
            $ne: "Cancelled"
        }

    }).lean();


    const barberData = {};


    // Count appointments for each barber
    for (const appointment of appointments) {

        const barberId =
            appointment.barber_id.toString();


        if (!barberData[barberId]) {

            barberData[barberId] = {

                barber_id:
                    appointment.barber_id,

                totalAppointments: 0
            };
        }


        barberData[barberId].totalAppointments++;
    }


    const result = [];


    // Calculate performance for every barber
    for (const barberId in barberData) {

        const data =
            barberData[barberId];


        // Get User model
        const User =
            require("../models/userModel");


        // Find barber user
        const user =
            await User.findById(
                data.barber_id
            ).lean();


        // IMPORTANT:
        // Same user can have multiple Barber profiles.
        // So find ALL profiles instead of findOne().
        const barberProfiles =
            await Barber.find({

                user_id: data.barber_id

            }).lean();


        // Get all Barber profile IDs
        const barberProfileIds =
            barberProfiles.map(
                profile => profile._id
            );


        // Find wages belonging to
        // any of these Barber profiles
        const wages =
            await Wage.find({

                barber_id: {
                    $in: barberProfileIds
                }

            }).lean();


        let totalCommission = 0;

        let totalRevenue = 0;


        // Calculate commission and revenue
        for (const wage of wages) {

            totalCommission += Number(
                wage.barber_commission || 0
            );


            totalRevenue += Number(
                wage.service_amount || 0
            );
        }


        result.push({

            barber_id:
                data.barber_id,

            barber_name:
                user
                    ? user.full_name
                    : "Unknown",

            totalAppointments:
                data.totalAppointments,

            totalCommission:
                totalCommission,

            totalRevenue:
                totalRevenue
        });
    }


    // Sort by total appointments
    result.sort(

        (a, b) =>
            b.totalAppointments -
            a.totalAppointments

    );


    return result;
};


// =====================================================
// 5. CUSTOMER VISITS
// =====================================================

const getCustomerVisits = async () => {

    return Appointment.aggregate([

        {
            $match: {

                status: {
                    $ne: "Cancelled"
                }
            }
        },

        {
            $group: {

                _id: "$customer_id",

                totalVisits: {
                    $sum: 1
                }
            }
        },

        {
            $lookup: {

                from: "customers",

                localField: "_id",

                foreignField: "_id",

                as: "customer"
            }
        },

        {
            $unwind: {

                path: "$customer",

                preserveNullAndEmptyArrays: true
            }
        },

        {
            $project: {

                _id: 0,

                customer_id: "$_id",

                customer_name:
                    "$customer.name",

                phone:
                    "$customer.phone",

                totalVisits: 1
            }
        },

        {
            $sort: {

                totalVisits: -1
            }
        }
    ]);
};


// =====================================================
// EXPORT ALL FUNCTIONS
// =====================================================

module.exports = {

    getDailyRevenue,

    getMonthlyRevenue,

    getTopServices,

    getBarberPerformance,

    getCustomerVisits

};