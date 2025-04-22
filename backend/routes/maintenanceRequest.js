const express = require("express")
const {getRequests, createRequest, getUserRequest} = require("../controllers/maintenanceRequest")
const {authAdmin, authLandlord, authTenant} = require("../middleware/jwt")

const router = express.Router()

router.get("/requests/all",authAdmin, authLandlord ,getRequests)
router.get("/request/my-request", authTenant, getUserRequest)
router.post("/requests/create", authTenant, createRequest)


module.exports = router