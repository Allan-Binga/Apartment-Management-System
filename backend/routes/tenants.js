const express = require("express")
const {updateInformation, deleteTenant} = require("../controllers/tenants")
const {authLandlord, authTenant} = require("../middleware/jwt")

const router = express.Router()

router.put("/update/:id", authTenant, authLandlord, updateInformation)
router.delete("/remove/:id", authTenant, authLandlord, deleteTenant)

module.exports = router