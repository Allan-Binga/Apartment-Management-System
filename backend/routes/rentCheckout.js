const express = require("express");
const { createRentCheckoutSession } = require("../controllers/rentCheckout");
const { authTenant } = require("../middleware/jwt");

const router = express.Router();

router.post("/create-checkout-session", authTenant, createRentCheckoutSession);

module.exports = router;
