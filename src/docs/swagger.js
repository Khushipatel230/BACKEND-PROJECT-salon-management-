const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Salon Management System Backend API",
    version: "1.0.0",
    description:
      "Comprehensive RESTful API documentation for Salon Management System. Supports Role-Based Access Control (Administrator, Receptionist, Barber) and JWT Authentication."
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local Development Server"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter your JWT Bearer token in the format: Bearer <token>"
      }
    },
    schemas: {
      UserLogin: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", example: "khushi@gmail.com" },
          password: { type: "string", example: "123456" }
        }
      },
      UserRegistration: {
        type: "object",
        required: ["full_name", "email", "password", "phone"],
        properties: {
          full_name: { type: "string", example: "Rahul Barber" },
          email: { type: "string", example: "rahul@gmail.com" },
          password: { type: "string", example: "123456" },
          phone: { type: "string", example: "9876543211" },
          role: {
            type: "string",
            enum: ["Administrator", "Receptionist", "Barber"],
            example: "Barber"
          }
        }
      },
      UserResponse: {
        type: "object",
        properties: {
          _id: { type: "string", example: "6a621c8aa4c649b780edfa27" },
          full_name: { type: "string", example: "Khushi" },
          email: { type: "string", example: "khushi@gmail.com" },
          role: { type: "string", example: "Administrator" },
          phone: { type: "string", example: "9876543210" }
        }
      },
      Customer: {
        type: "object",
        required: ["name", "phone"],
        properties: {
          _id: { type: "string", example: "6a6725b201f46b5bf8efcf38" },
          name: { type: "string", example: "Khushi" },
          phone: { type: "string", example: "9876543210" },
          email: { type: "string", example: "khushi@gmail.com" },
          gender: { type: "string", enum: ["Male", "Female", "Other"], example: "Female" }
        }
      },
      Service: {
        type: "object",
        required: ["service_name", "duration", "price"],
        properties: {
          _id: { type: "string", example: "6a7ec44067b32994f9ebb01a" },
          service_name: { type: "string", example: "Hair Cut" },
          duration: { type: "integer", example: 60, description: "Duration in minutes" },
          price: { type: "number", example: 300, description: "Price in INR" },
          description: { type: "string", example: "Hair cutting service" }
        }
      },
      Barber: {
        type: "object",
        required: ["user_id", "commission_percentage", "joining_date"],
        properties: {
          _id: { type: "string", example: "6a7ec40c67b32994f9ebb019" },
          user_id: { type: "string", example: "6a7ec3c2111fa0430f0f2432" },
          specialization: { type: "string", example: "Hair Stylist" },
          commission_percentage: { type: "number", example: 40.0 },
          joining_date: { type: "string", example: "2026-08-01" }
        }
      },
      Appointment: {
        type: "object",
        required: ["customer_id", "barber_id", "service_id", "appointment_date", "start_time", "end_time"],
        properties: {
          _id: { type: "string", example: "6a85932fb47b751c88a1e806" },
          customer_id: { type: "string", example: "6a6725b201f46b5bf8efcf38" },
          barber_id: { type: "string", example: "6a7ec3c2111fa0430f0f2432" },
          service_id: { type: "string", example: "6a7ec44067b32994f9ebb01a" },
          appointment_date: { type: "string", format: "date-time", example: "2026-08-24T00:00:00.000Z" },
          start_time: { type: "string", example: "10:00" },
          end_time: { type: "string", example: "11:00" },
          status: {
            type: "string",
            enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
            example: "Confirmed"
          },
          remarks: { type: "string", example: "Hair Cut" }
        }
      },
      Slot: {
        type: "object",
        required: ["barber_id", "day"],
        properties: {
          _id: { type: "string", example: "6a7f0d04b3e1d2e082636328" },
          barber_id: { type: "string", example: "6a7ec3c2111fa0430f0f2432" },
          day: {
            type: "string",
            enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            example: "Monday"
          },
          start_time: { type: "string", example: "12:00" },
          end_time: { type: "string", example: "15:00" },
          is_holiday: { type: "boolean", example: false }
        }
      },
      AttendanceCheckIn: {
        type: "object",
        required: ["barber_id", "date"],
        properties: {
          barber_id: { type: "string", example: "6a7ec40c67b32994f9ebb019" },
          date: { type: "string", example: "2026-09-27" }
        }
      },
      AttendanceResponse: {
        type: "object",
        properties: {
          _id: { type: "string", example: "6a7f11342093761d41bafa9a" },
          barber_id: { type: "string", example: "6a7ec40c67b32994f9ebb019" },
          date: { type: "string", example: "2026-09-27" },
          status: { type: "string", example: "Present" },
          check_in: { type: "string", format: "date-time" },
          check_out: { type: "string", format: "date-time" }
        }
      },
      WageCreate: {
        type: "object",
        required: ["barber_id", "appointment_id"],
        properties: {
          barber_id: { type: "string", example: "6a7ec40c67b32994f9ebb019" },
          appointment_id: { type: "string", example: "6a85932fb47b751c88a1e806" },
          salary: { type: "number", example: 5000 }
        }
      },
      WageResponse: {
        type: "object",
        properties: {
          _id: { type: "string", example: "6ab3e4f2a63f1fe80a3576a0" },
          barber_id: { type: "string", example: "6a7ec40c67b32994f9ebb019" },
          appointment_id: { type: "string", example: "6a85932fb47b751c88a1e806" },
          month: { type: "string", example: "2026-08" },
          salary: { type: "number", example: 5000 },
          service_amount: { type: "number", example: 300 },
          commission_percentage: { type: "number", example: 40 },
          barber_commission: { type: "number", example: 120 },
          salon_amount: { type: "number", example: 180 },
          total_amount: { type: "number", example: 5120 }
        }
      },
      ErrorResponse: {
        type: "object",
        properties: {
          message: { type: "string", example: "Error description" }
        }
      }
    }
  },
  paths: {
    "/login": {
      post: {
        tags: ["Authentication"],
        summary: "User Login",
        description: "Validates incoming user credentials and returns a Bearer JWT token.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserLogin" }
            }
          }
        },
        responses: {
          200: {
            description: "Login Successful",
            content: {
              "application/json": {
                example: {
                  message: "Login Successful",
                  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  user: {
                    _id: "6a621c8aa4c649b780edfa27",
                    full_name: "Khushi",
                    email: "khushi@gmail.com",
                    role: "Administrator",
                    phone: "9876543210"
                  }
                }
              }
            }
          },
          401: {
            description: "Invalid email or password",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
          }
        }
      }
    },
    "/login/register": {
      post: {
        tags: ["Authentication"],
        summary: "Register User Account",
        description: "Registers a new staff or user account. Public registration creates non-privileged accounts. Registration of Administrator or Receptionist accounts requires an Administrator Bearer token.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserRegistration" }
            }
          }
        },
        responses: {
          201: {
            description: "Registration Successful",
            content: {
              "application/json": {
                example: {
                  message: "Registration Successful",
                  user: {
                    _id: "6a7ec3c2111fa0430f0f2432",
                    full_name: "Rahul Barber",
                    email: "rahul@gmail.com",
                    role: "Barber",
                    phone: "9876543211"
                  }
                }
              }
            }
          },
          400: { description: "Missing or invalid fields" },
          403: { description: "Forbidden - Administrator authorization required for privileged roles" },
          409: { description: "User already exists with this email" }
        }
      }
    },
    "/login/verify": {
      get: {
        tags: ["Authentication"],
        summary: "Verify JWT Token",
        description: "Checks if the provided Bearer JWT token is valid.",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Token is valid" },
          401: { description: "Invalid or Expired Token" }
        }
      }
    },
    "/customers": {
      get: {
        tags: ["Customer Management"],
        summary: "Get All Customers",
        description: "Fetches list of customers. Allowed Roles: Administrator, Receptionist.",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of customers",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Customer" } } } }
          },
          401: { description: "Unauthorized" },
          403: { description: "Access Denied" }
        }
      },
      post: {
        tags: ["Customer Management"],
        summary: "Create Customer",
        description: "Creates a new customer. Allowed Roles: Administrator.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/Customer" } } }
        },
        responses: {
          201: { description: "Customer Added Successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Access Denied" }
        }
      }
    },
    "/customers/{id}": {
      get: {
        tags: ["Customer Management"],
        summary: "Get Customer By ID",
        description: "Allowed Roles: Administrator, Receptionist.",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { content: { "application/json": { schema: { $ref: "#/components/schemas/Customer" } } } },
          404: { description: "Customer Not Found" }
        }
      },
      put: {
        tags: ["Customer Management"],
        summary: "Update Customer",
        description: "Allowed Roles: Administrator.",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Customer" } } } },
        responses: { 200: { description: "Customer Updated Successfully" }, 404: { description: "Customer Not Found" } }
      },
      delete: {
        tags: ["Customer Management"],
        summary: "Delete Customer",
        description: "Allowed Roles: Administrator.",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Customer Deleted Successfully" }, 404: { description: "Customer Not Found" } }
      }
    },
    "/services": {
      get: {
        tags: ["Service Configuration"],
        summary: "Get All Services",
        description: "Accesses service catalog menu. Allowed Roles: Administrator.",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Service" } } } } }
        }
      },
      post: {
        tags: ["Service Configuration"],
        summary: "Add Service",
        description: "Allowed Roles: Administrator.",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Service" } } } },
        responses: { 201: { description: "Service Added Successfully" } }
      }
    },
    "/services/{id}": {
      get: {
        tags: ["Service Configuration"],
        summary: "Get Service By ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { content: { "application/json": { schema: { $ref: "#/components/schemas/Service" } } } } }
      },
      put: {
        tags: ["Service Configuration"],
        summary: "Update Service",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Service" } } } },
        responses: { 200: { description: "Service Updated Successfully" } }
      },
      delete: {
        tags: ["Service Configuration"],
        summary: "Delete Service",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Service Deleted Successfully" } }
      }
    },
    "/barbers": {
      get: {
        tags: ["Barber Administration"],
        summary: "Get All Barbers",
        description: "Allowed Roles: Administrator.",
        security: [{ bearerAuth: [] }],
        responses: { 200: { content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Barber" } } } } } }
      },
      post: {
        tags: ["Barber Administration"],
        summary: "Add Barber Profile",
        description: "Allowed Roles: Administrator.",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Barber" } } } },
        responses: { 201: { description: "Barber Added Successfully" } }
      }
    },
    "/barbers/{id}": {
      get: {
        tags: ["Barber Administration"],
        summary: "Get Barber By ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { content: { "application/json": { schema: { $ref: "#/components/schemas/Barber" } } } } }
      },
      put: {
        tags: ["Barber Administration"],
        summary: "Update Barber",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Barber" } } } },
        responses: { 200: { description: "Barber Updated Successfully" } }
      },
      delete: {
        tags: ["Barber Administration"],
        summary: "Delete Barber",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Barber Deleted Successfully" } }
      }
    },
    "/appointments": {
      get: {
        tags: ["Appointment Lifecycles"],
        summary: "Get All Appointments",
        description: "Allowed Roles: Administrator, Receptionist.",
        security: [{ bearerAuth: [] }],
        responses: { 200: { content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Appointment" } } } } } }
      },
      post: {
        tags: ["Appointment Lifecycles"],
        summary: "Create Appointment",
        description: "Schedules a visit. Validates double booking & shift hours. Allowed Roles: Administrator, Receptionist.",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Appointment" } } } },
        responses: { 201: { description: "Appointment Added Successfully" }, 409: { description: "Slot Conflict Detected" } }
      }
    },
    "/appointments/{id}": {
      get: {
        tags: ["Appointment Lifecycles"],
        summary: "Get Appointment By ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { content: { "application/json": { schema: { $ref: "#/components/schemas/Appointment" } } } } }
      },
      put: {
        tags: ["Appointment Lifecycles"],
        summary: "Update Appointment",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Appointment" } } } },
        responses: { 200: { description: "Appointment Updated Successfully" } }
      },
      delete: {
        tags: ["Appointment Lifecycles"],
        summary: "Delete Appointment",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Appointment Deleted Successfully" } }
      }
    },
    "/slots": {
      get: {
        tags: ["Slot Scheduling"],
        summary: "Get All Slots",
        description: "Allowed Roles: Administrator, Receptionist.",
        security: [{ bearerAuth: [] }],
        responses: { 200: { content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Slot" } } } } } }
      },
      post: {
        tags: ["Slot Scheduling"],
        summary: "Create Slot / Operational Window",
        description: "Allowed Roles: Administrator, Receptionist.",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Slot" } } } },
        responses: { 201: { description: "Slot Created Successfully" }, 409: { description: "Overlap Slot Conflict" } }
      }
    },
    "/slots/{id}": {
      get: {
        tags: ["Slot Scheduling"],
        summary: "Get Slot By ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { content: { "application/json": { schema: { $ref: "#/components/schemas/Slot" } } } } }
      },
      put: {
        tags: ["Slot Scheduling"],
        summary: "Update Slot",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Slot" } } } },
        responses: { 200: { description: "Slot Updated Successfully" } }
      },
      delete: {
        tags: ["Slot Scheduling"],
        summary: "Delete Slot",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Slot Deleted Successfully" } }
      }
    },
    "/attendance": {
      get: {
        tags: ["Employee Attendance"],
        summary: "Get All Attendance Records",
        description: "Allowed Roles: Administrator.",
        security: [{ bearerAuth: [] }],
        responses: { 200: { content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/AttendanceResponse" } } } } } }
      }
    },
    "/attendance/checkin": {
      post: {
        tags: ["Employee Attendance"],
        summary: "Barber Check-In",
        description: "Registers daily check-in timestamp. Barbers can mark ONLY their own attendance. Allowed Roles: Administrator, Barber.",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/AttendanceCheckIn" } } } },
        responses: { 201: { description: "Check-in Successful" }, 400: { description: "Validation error or duplicate attendance" } }
      }
    },
    "/attendance/checkout/{id}": {
      post: {
        tags: ["Employee Attendance"],
        summary: "Barber Check-Out",
        description: "Closes active time card tracking window. Allowed Roles: Administrator, Barber.",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Check-out Successful" } }
      }
    },
    "/attendance/{id}": {
      get: {
        tags: ["Employee Attendance"],
        summary: "Get Attendance By ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { content: { "application/json": { schema: { $ref: "#/components/schemas/AttendanceResponse" } } } } }
      },
      delete: {
        tags: ["Employee Attendance"],
        summary: "Delete Attendance",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Attendance Deleted Successfully" } }
      }
    },
    "/wages": {
      get: {
        tags: ["Wage & Payroll"],
        summary: "Get All Wage Records",
        description: "Calculates/fetches payroll statements. Administrator sees all records; Barber sees ONLY personal wage records. Allowed Roles: Administrator, Barber.",
        security: [{ bearerAuth: [] }],
        responses: { 200: { content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/WageResponse" } } } } } }
      },
      post: {
        tags: ["Wage & Payroll"],
        summary: "Create Wage Record",
        description: "Finalizes monthly balance and logs payout distribution (e.g. 40% commission calculation). Allowed Roles: Administrator.",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/WageCreate" } } } },
        responses: { 201: { description: "Wage Calculated Successfully" } }
      }
    },
    "/wages/{id}": {
      get: {
        tags: ["Wage & Payroll"],
        summary: "Get Wage By ID",
        description: "Barber sees ONLY personal wage record. Allowed Roles: Administrator, Barber.",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { content: { "application/json": { schema: { $ref: "#/components/schemas/WageResponse" } } } }, 403: { description: "Access Denied" } }
      },
      put: {
        tags: ["Wage & Payroll"],
        summary: "Update Wage",
        description: "Allowed Roles: Administrator.",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/WageCreate" } } } },
        responses: { 200: { description: "Wage Updated Successfully" } }
      },
      delete: {
        tags: ["Wage & Payroll"],
        summary: "Delete Wage",
        description: "Allowed Roles: Administrator.",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Wage Deleted Successfully" } }
      }
    },
    "/reports/daily-revenue": {
      get: {
        tags: ["Corporate Analytics & Reports"],
        summary: "Get Daily Revenue Report",
        description: "Computes daily revenue, barber commission, and salon revenue. Allowed Roles: Administrator.",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "date", in: "query", schema: { type: "string", example: "2026-08-24" } }],
        responses: { 200: { description: "Daily Revenue Report" } }
      }
    },
    "/reports/monthly-revenue": {
      get: {
        tags: ["Corporate Analytics & Reports"],
        summary: "Get Monthly Revenue Report",
        description: "Allowed Roles: Administrator.",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "month", in: "query", schema: { type: "string", example: "2026-08" } }],
        responses: { 200: { description: "Monthly Revenue Report" } }
      }
    },
    "/reports/top-services": {
      get: {
        tags: ["Corporate Analytics & Reports"],
        summary: "Get Top Services Report",
        description: "Rank-orders standard menu options by total booking volume. Allowed Roles: Administrator.",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Top Services Report" } }
      }
    },
    "/reports/barber-performance": {
      get: {
        tags: ["Corporate Analytics & Reports"],
        summary: "Get Barber Performance Report",
        description: "Summarizes appointment tracking metrics, total revenue, and sales commission for each stylist. Allowed Roles: Administrator.",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Barber Performance Report" } }
      }
    },
    "/reports/customer-visits": {
      get: {
        tags: ["Corporate Analytics & Reports"],
        summary: "Get Customer Visits Report",
        description: "Analyzes customer return rates and visit retention counts. Allowed Roles: Administrator.",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Customer Visits Report" } }
      }
    }
  }
};

module.exports = swaggerDocument;
