const express = require("express");
const { getAllPayments, getUsersPayment } = require("../controllers/payments");
const { authTenant, authLandlord } = require("../middleware/jwt");

const router = express.Router();

router.get("/all", authLandlord, getAllPayments);
router.get("/my-payments", authTenant, getUsersPayment);

module.exports = router;
