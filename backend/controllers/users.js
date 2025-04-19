const client = require("../config/db");

//Fetch All Tenants
const getTenants = async (req, res) => {
  try {
    const tenants = await client.query("SELECT * FROM tenants");

    res.status(200).json(tenants.rows);
  } catch (error) {
    res.status(500).json("Could not fetch tenants.");
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

module.exports = { getTenants, getLandlords, getAdmins };
