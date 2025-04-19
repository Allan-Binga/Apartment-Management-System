const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//Tenant ID Middleware
const authTenant = (req, res, next) => {
  try {
    const token = req.cookies.tenantSession;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized tenant." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.tenantId = decoded.tenant;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired tenant token." });
  }
};

// Lanlord ID Middleware
const authLandlord = (req, res, next) => {
  try {
    const token = req.cookies.landlordSession;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please login as landlord." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.landlordId = decoded.landlord;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired landlord token." });
  }
};

//Admin ID Middleware
const authAdmin = (req, res, next) => {
  try {
    const token = req.cookies.adminSession;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized admin." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.admin;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired admin token." });
  }
};

module.exports = { authTenant, authLandlord, authAdmin };
