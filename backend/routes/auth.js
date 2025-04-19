const express = require("express");
const {
  registerTenant,
  loginTenant,
  logoutTenant,
  registerLandlord,
  loginLandlord,
  logoutLandlord,
  registerAdmin,
  loginAdmin,
  logoutAdmin,
} = require("../controllers/auth");

const router = express.Router();

//Routes
//(I) Tenant Route
router.post("/register/tenant", registerTenant);
router.post("/login/tenant", loginTenant);
router.post("/logout/tenant", logoutTenant);

//(II) Landord Route
router.post("/register/landlord", registerLandlord);
router.post("/login/landlord", loginLandlord);
router.post("/logout/landlord", logoutLandlord);

//(III) Admin Routes
router.post("/register/admin", registerAdmin);
router.post("/login/admin", loginAdmin);
router.post("/logout/admin", logoutAdmin);

module.exports = router;
