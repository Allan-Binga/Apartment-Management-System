const client = require("../config/db");
const jwt = require("jsonwebtoken");

//Fetch All Tenants
const getTenants = async (req, res) => {
  try {
    const tenants = await client.query("SELECT * FROM tenants");

    res.status(200).json(tenants.rows);
  } catch (error) {
    res.status(500).json("Could not fetch tenants.");
  }
};

//Get tenants by ID
const getSingleTenant = async (req, res) => {
  const { id } = req.params;

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return res.status(400).json({ message: "Invalid UUID format." });
  }

  try {
    // Fetch tenant details
    const tenantResult = await client.query(
      "SELECT * FROM tenants WHERE id = $1",
      [id]
    );

    if (tenantResult.rows.length === 0) {
      return res.status(404).json({ message: "Tenant not found." });
    }

    const tenant = tenantResult.rows[0];

    // Fetch next rent due from payment table
    const paymentResult = await client.query(
      `SELECT paymentdate FROM payment WHERE tenantid = $1 AND paymentdate >= CURRENT_DATE ORDER BY paymentdate ASC LIMIT 1`,
      [id]
    );

    const nextPaymentDate =
      paymentResult.rows.length > 0 ? paymentResult.rows[0].paymentdate : null;

    // Fetch latest maintenance request status using request_date
    const maintenanceResult = await client.query(
      `SELECT status FROM maintenance_requests WHERE tenant_id = $1 ORDER BY request_date DESC LIMIT 1`,
      [id]
    );

    const latestMaintenanceStatus =
      maintenanceResult.rows.length > 0
        ? maintenanceResult.rows[0].status
        : null;

    // Return combined response
    res.status(200).json({
      ...tenant,
      nextPaymentDate,
      latestMaintenanceStatus,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch tenant details." });
  }
};

//Get current user
const getCurrentMurandiUser = (req, res) => {
  const { tenantSession, landlordSession, adminSession } = req.cookies;

  let token, role;

  if (tenantSession) {
    token = tenantSession;
    role = "tenant";
  } else if (landlordSession) {
    token = landlordSession;
    role = "landlord";
  } else if (adminSession) {
    token = adminSession;
    role = "admin";
  } else {
    return res.status(401).json({ message: "Not logged in" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    res.json({
      firstName: decoded.firstName,
      role: role,
    });
  });
};

//Fetch All Landlords
const getLandlords = async (req, res) => {
  try {
    const landlords = await client.query("SELECT * FROM landlords");
    res.status(200).json(landlords.rows);
  } catch (error) {
    res.status(500).json("Could not fetch tenants.");
  }
};

//Fetch Admins
const getAdmins = async (req, res) => {
  try {
    const admins = await client.query("SELECT * FROM admins");
    res.status(200).json(admins.rows);
  } catch (error) {
    res.status(500).json("Could not fetch tenants.");
  }
};

module.exports = {
  getTenants,
  getLandlords,
  getAdmins,
  getCurrentMurandiUser,
  getSingleTenant,
};
