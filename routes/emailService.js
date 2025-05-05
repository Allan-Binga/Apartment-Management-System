const express = require("express");
const {
  verifyVerificationToken,
  resendVerificationEmail,
  verifyPasswordResetToken,
  resendPasswordResetEmail,
} = require("../controllers/emailService");

const router = express.Router();

router.get("/", verifyVerificationToken);
router.get("/password/token", verifyPasswordResetToken);
router.post("/resend/account/verification", resendVerificationEmail);
router.post("/resend/password/reset", resendPasswordResetEmail);

module.exports = router;
