const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Lanlord ID Middleware
const authAdminOrLandlord = (req, res, next) => {
  try {
    const adminToken = req.cookies.adminSession;
    const landlordToken = req.cookies.landlordSession;

    if (adminToken) {
      const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
      req.adminId = decoded.admin;
      return next();
    }

    if (landlordToken) {
      const decoded = jwt.verify(landlordToken, process.env.JWT_SECRET);
      req.landlordId = decoded.landlord;
      return next();
    }

    return res
      .status(401)
      .json({ message: "Unauthorized. Please login as landlord or admin." });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired token." });
  }
};

module.exports = authAdminOrLandlord