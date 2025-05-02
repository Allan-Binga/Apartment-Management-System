const express = require("express");
const {
  getTenants,
  getLandlords,
  getAdmins,
  getCurrentMurandiUser, getSingleTenant
} = require("../controllers/users");
const {getTechnicians} = require("../controllers/technician")

const router = express.Router();

//Routes
router.get("/me", getCurrentMurandiUser);
router.get("/tenants/:id", getSingleTenant)
router.get("/tenants", getTenants);
router.get("/landlords", getLandlords);
router.get("/admins", getAdmins);
router.get("/technicians", getTechnicians)

module.exports = router;
