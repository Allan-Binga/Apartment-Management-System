const express = require("express");
const { getReports, getPaymentReports, getMaintenanceReports } = require("../controllers/reports");

const router = express.Router();

router.get("/", getReports)
router.get("/payment", getPaymentReports)
router.get("/maintenance", getMaintenanceReports)

module.exports = router;
