const client = require("../config/db");
const jwt = require("jsonwebtoken")

//Fetch All Tenants
const getTenants = async (req, res) => {
  try {
    const tenants = await client.query("SELECT * FROM tenants");

    res.status(200).json(tenants.rows);
  } catch (error) {
    res.status(500).json("Could not fetch tenants.");
  }
};

//Get current tenant
const getCurrentTenant = (req, res) => {
  const token = req.cookies.tenantSession;
  if (!token) return res.status(401).json({ message: "Not logged in." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ firstName: decoded.firstName });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
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

module.exports = { getTenants, getLandlords, getAdmins,getCurrentTenant };
