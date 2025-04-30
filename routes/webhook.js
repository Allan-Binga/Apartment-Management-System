const express = require("express");
const { handleWebhook, handleMpesaCallback } = require("../controllers/webhook");

const router = express.Router();

router.post("/", express.raw({type: "application/json"}), handleWebhook)
router.post("/callback", handleMpesaCallback)

module.exports = router;
