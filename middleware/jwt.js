const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//Tenant ID Middleware
const authTenant = (req, res, next) => {
  try {
    const token = req.cookies.tenantSession;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login as tenant." });
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

module.exports = { authTenant };
