const express = require("express");
const { getAllPayments, getUsersPayment } = require("../controllers/payments");
const { authTenant, authLandlord, authAdmin } = require("../middleware/jwt");

const router = express.Router();

router.get("/all", authAdmin, authLandlord, getAllPayments);
router.get("/my-payments", authTenant, getUsersPayment);

module.exports = router;
