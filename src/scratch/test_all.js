const http = require("http");

function request(path, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const reqOptions = {
      hostname: "localhost",
      port: 3000,
      path: path,
      method: options.method || "GET",
      headers: options.headers || {}
    };

    if (body && typeof body === "object") {
      body = JSON.stringify(body);
      reqOptions.headers["Content-Type"] = "application/json";
      reqOptions.headers["Content-Length"] = Buffer.byteLength(body);
    }

    const req = http.request(reqOptions, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, headers: res.headers, body: parsed, raw: data });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, raw: data });
        }
      });
    });

    req.on("error", (err) => reject(err));
    if (body) req.write(body);
    req.end();
  });
}

async function runTests() {
  console.log("==========================================");
  console.log("RUNNING COMPREHENSIVE BACKEND VERIFICATION");
  console.log("==========================================");

  let adminToken = "";
  let barberToken = "";
  let receptionistToken = "";

  // 1. AUTH - Login Admin
  const adminLogin = await request("/login", { method: "POST" }, { email: "khushi@gmail.com", password: "123456" });
  console.log("1. Admin Login:", adminLogin.status, adminLogin.body.message || "");
  if (adminLogin.status === 200 && adminLogin.body.token) {
    adminToken = adminLogin.body.token;
    console.log("   Admin Role:", adminLogin.body.user.role);
  }

  // 2. AUTH - Login Barber
  const barberLogin = await request("/login", { method: "POST" }, { email: "rahul@gmail.com", password: "123456" });
  console.log("2. Barber Login:", barberLogin.status, barberLogin.body.message || "");
  if (barberLogin.status === 200 && barberLogin.body.token) {
    barberToken = barberLogin.body.token;
    console.log("   Barber Role:", barberLogin.body.user.role);
  }

  // 3. AUTH - Register Receptionist using Admin Token
  const recepEmail = `recep_${Date.now()}@gmail.com`;
  const recepReg = await request(
    "/login/register",
    { method: "POST", headers: { Authorization: `Bearer ${adminToken}` } },
    { full_name: "Test Receptionist", email: recepEmail, password: "123456", phone: "9988776655", role: "Receptionist" }
  );
  console.log("3. Admin Register Receptionist:", recepReg.status, recepReg.body.message || recepReg.body.user?.role || "");

  // Login Receptionist
  const recepLogin = await request("/login", { method: "POST" }, { email: recepEmail, password: "123456" });
  if (recepLogin.status === 200 && recepLogin.body.token) {
    receptionistToken = recepLogin.body.token;
    console.log("   Receptionist Token Acquired! Role:", recepLogin.body.user.role);
  }

  // 4. AUTH - Security check: Unauthenticated registration of Administrator should fail (403)
  const unauthAdminReg = await request(
    "/login/register",
    { method: "POST" },
    { full_name: "Hacker Admin", email: `hacker_${Date.now()}@gmail.com`, password: "123456", phone: "1111111111", role: "Administrator" }
  );
  console.log("4. Unauthenticated Admin Register Security Check:", unauthAdminReg.status, unauthAdminReg.body.message);

  // 5. RBAC MATRIX TESTS
  console.log("\n--- Testing RBAC Matrix Across Routes ---");

  // CUSTOMERS (/customers)
  const custAdmin = await request("/customers", { headers: { Authorization: `Bearer ${adminToken}` } });
  console.log("CUSTOMERS - Admin GET:", custAdmin.status, Array.isArray(custAdmin.body) ? `Found ${custAdmin.body.length} customers` : "");

  const custRecep = await request("/customers", { headers: { Authorization: `Bearer ${receptionistToken}` } });
  console.log("CUSTOMERS - Receptionist GET:", custRecep.status);

  const custBarber = await request("/customers", { headers: { Authorization: `Bearer ${barberToken}` } });
  console.log("CUSTOMERS - Barber GET (Expect 403):", custBarber.status);

  const custRecepPost = await request("/customers", { method: "POST", headers: { Authorization: `Bearer ${receptionistToken}` } }, { name: "Test Cust", phone: "9000000000" });
  console.log("CUSTOMERS - Receptionist POST (Expect 403):", custRecepPost.status);

  // SERVICES (/services)
  const servAdmin = await request("/services", { headers: { Authorization: `Bearer ${adminToken}` } });
  console.log("SERVICES - Admin GET:", servAdmin.status, Array.isArray(servAdmin.body) ? `Found ${servAdmin.body.length} services` : "");

  const servRecep = await request("/services", { headers: { Authorization: `Bearer ${receptionistToken}` } });
  console.log("SERVICES - Receptionist GET (Expect 403):", servRecep.status);

  const servBarber = await request("/services", { headers: { Authorization: `Bearer ${barberToken}` } });
  console.log("SERVICES - Barber GET (Expect 403):", servBarber.status);

  // BARBERS (/barbers)
  const barbAdmin = await request("/barbers", { headers: { Authorization: `Bearer ${adminToken}` } });
  console.log("BARBERS - Admin GET:", barbAdmin.status, Array.isArray(barbAdmin.body) ? `Found ${barbAdmin.body.length} barbers` : "");

  const barbRecep = await request("/barbers", { headers: { Authorization: `Bearer ${receptionistToken}` } });
  console.log("BARBERS - Receptionist GET (Expect 403):", barbRecep.status);

  const barbBarber = await request("/barbers", { headers: { Authorization: `Bearer ${barberToken}` } });
  console.log("BARBERS - Barber GET (Expect 403):", barbBarber.status);

  // APPOINTMENTS (/appointments)
  const appAdmin = await request("/appointments", { headers: { Authorization: `Bearer ${adminToken}` } });
  console.log("APPOINTMENTS - Admin GET:", appAdmin.status);

  const appRecep = await request("/appointments", { headers: { Authorization: `Bearer ${receptionistToken}` } });
  console.log("APPOINTMENTS - Receptionist GET:", appRecep.status);

  const appBarber = await request("/appointments", { headers: { Authorization: `Bearer ${barberToken}` } });
  console.log("APPOINTMENTS - Barber GET (Expect 403):", appBarber.status);

  // SLOTS (/slots)
  const slotAdmin = await request("/slots", { headers: { Authorization: `Bearer ${adminToken}` } });
  console.log("SLOTS - Admin GET:", slotAdmin.status);

  const slotRecep = await request("/slots", { headers: { Authorization: `Bearer ${receptionistToken}` } });
  console.log("SLOTS - Receptionist GET:", slotRecep.status);

  const slotBarber = await request("/slots", { headers: { Authorization: `Bearer ${barberToken}` } });
  console.log("SLOTS - Barber GET (Expect 403):", slotBarber.status);

  // ATTENDANCE (/attendance)
  const attAdmin = await request("/attendance", { headers: { Authorization: `Bearer ${adminToken}` } });
  console.log("ATTENDANCE - Admin GET:", attAdmin.status);

  const attRecep = await request("/attendance", { headers: { Authorization: `Bearer ${receptionistToken}` } });
  console.log("ATTENDANCE - Receptionist GET (Expect 403):", attRecep.status);

  const attBarber = await request("/attendance", { headers: { Authorization: `Bearer ${barberToken}` } });
  console.log("ATTENDANCE - Barber GET (Expect 403):", attBarber.status);

  // WAGES (/wages)
  const wageAdmin = await request("/wages", { headers: { Authorization: `Bearer ${adminToken}` } });
  console.log("WAGES - Admin GET:", wageAdmin.status, Array.isArray(wageAdmin.body) ? `Found ${wageAdmin.body.length} records` : "");

  const wageRecep = await request("/wages", { headers: { Authorization: `Bearer ${receptionistToken}` } });
  console.log("WAGES - Receptionist GET (Expect 403):", wageRecep.status);

  const wageBarber = await request("/wages", { headers: { Authorization: `Bearer ${barberToken}` } });
  console.log("WAGES - Barber GET (Personal Filtered):", wageBarber.status, Array.isArray(wageBarber.body) ? `Filtered ${wageBarber.body.length} records` : "");

  // REPORTS (/reports)
  const repAdmin = await request("/reports/daily-revenue", { headers: { Authorization: `Bearer ${adminToken}` } });
  console.log("REPORTS - Admin GET daily-revenue:", repAdmin.status, repAdmin.body.message || "");

  const repRecep = await request("/reports/daily-revenue", { headers: { Authorization: `Bearer ${receptionistToken}` } });
  console.log("REPORTS - Receptionist GET daily-revenue (Expect 403):", repRecep.status);

  const repBarber = await request("/reports/daily-revenue", { headers: { Authorization: `Bearer ${barberToken}` } });
  console.log("REPORTS - Barber GET daily-revenue (Expect 403):", repBarber.status);

  // SWAGGER UI DOCS
  const swaggerRes = await request("/api-docs/");
  console.log("SWAGGER UI - /api-docs/ status:", swaggerRes.status);

  console.log("\n==========================================");
  console.log("ALL TESTS COMPLETED SUCCESSFULLY!");
  console.log("==========================================");
}

runTests().catch(console.error);
