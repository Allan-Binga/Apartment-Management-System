const express = require("express");
const { getAllPayments, getUsersPayment } = require("../controllers/payments");
const { authTenant} = require("../middleware/jwt");
const authAdminOrLandlord = require("../middleware/jwt2")

const router = express.Router();

router.get("/all", authAdminOrLandlord, getAllPayments);
router.get("/my-payments", authTenant, getUsersPayment);

module.exports = router;
