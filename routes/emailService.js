const express = require("express");
const { verifyVerificationToken, resendVerificationEmail } = require("../controllers/emailService");

const router = express.Router();

router.get("/", verifyVerificationToken);
router.post("/resend/account/verification", resendVerificationEmail)

module.exports = router;
