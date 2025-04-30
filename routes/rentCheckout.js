const express = require("express");
const { createRentCheckoutSession, createMpesaCheckout } = require("../controllers/rentCheckout");
const { authTenant } = require("../middleware/jwt");

const router = express.Router();

router.post("/create-checkout-session", authTenant, createRentCheckoutSession);
router.post("/create-pesa-checkout", createMpesaCheckout)

module.exports = router;
