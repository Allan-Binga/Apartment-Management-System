const express = require("express");
const {
  getRequests,
  createRequest,
  getUserRequest,
  completeRequest,
} = require("../controllers/maintenanceRequest");
const { authAdmin, authLandlord, authTenant } = require("../middleware/jwt");

const router = express.Router();

router.get("/requests/all", authAdmin, authLandlord, getRequests);
router.get("/requests/my-request", authTenant, getUserRequest);
router.post("/requests/create", authTenant, createRequest);
router.patch("/requests/complete/:id", completeRequest);

module.exports = router;
