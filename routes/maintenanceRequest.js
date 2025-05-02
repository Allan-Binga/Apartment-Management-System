const express = require("express");
const {
  getRequests,
  createRequest,
  getUserRequest,
  completeRequest,
} = require("../controllers/maintenanceRequest");
const { authLandlord, authTenant } = require("../middleware/jwt");

const router = express.Router();

router.get("/requests/all", getRequests);
router.get("/requests/my-requests", getUserRequest);
router.post("/requests/create", authTenant,createRequest);
router.patch("/requests/complete/:id", completeRequest);

module.exports = router;
