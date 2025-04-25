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

module.exports = { getTenants, getLandlords, getAdmins, getCurrentMurandiUser };
