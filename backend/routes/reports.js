const express = require("express");
const { getReports, getPaymentReports } = require("../controllers/reports");

const router = express.Router();

router.get("/", getReports)
router.get("/payment", getPaymentReports)

module.exports = router;
