const express = require("express");
const {
  getTenants,
  getLandlords,
  getAdmins,
  getCurrentTenant,
} = require("../controllers/users");

const router = express.Router();

//Routes
router.get("/tenant/me", getCurrentTenant);
router.get("/tenants", getTenants);
router.get("/landlords", getLandlords);
router.get("/admins", getAdmins);

module.exports = router;
