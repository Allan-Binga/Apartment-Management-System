const express = require("express")
const {getReceipts} = require("../controllers/receipts")

const router = express.Router()

router.get("/all", getReceipts)

module.exports = router