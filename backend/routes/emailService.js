const express = require("express");
const { verifyVerificationToken } = require("../controllers/emailService");

const router = express.Router();

router.get("/", verifyVerificationToken);

module.exports = router;
