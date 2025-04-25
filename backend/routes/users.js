const express = require("express");
const {
  getTenants,
  getLandlords,
  getAdmins,
  getCurrentMurandiUser
} = require("../controllers/users");

const router = express.Router();

//Routes
router.get("/me", getCurrentMurandiUser);
router.get("/tenants", getTenants);
router.get("/landlords", getLandlords);
router.get("/admins", getAdmins);

module.exports = router;
