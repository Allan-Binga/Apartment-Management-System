const jwt = require("jsonwebtoken");

const authAnyUser = (req, res, next) => {
  const { tenantSession, landlordSession, adminSession } = req.cookies;

  let token;

  if (tenantSession) {
    token = tenantSession;
    req.role = "tenant";
  } else if (landlordSession) {
    token = landlordSession;
    req.role = "landlord";
  } else if (adminSession) {
    token = adminSession;
    req.role = "admin";
  } else {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user info for controller
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = {authAnyUser};
