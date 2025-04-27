const express = require("express");
const { updateInformation, deleteTenant } = require("../controllers/tenants");
const { authLandlord, authTenant } = require("../middleware/jwt");

const router = express.Router();

//Landlord
router.put("/landlord/update/:id", authLandlord, updateInformation);
router.delete("/landlord/remove/:id", authLandlord, deleteTenant);

//Tenant
router.put("/tenant/update/:id", authTenant, updateInformation);
router.delete("/tenant/remove/:id", authTenant, deleteTenant);

module.exports = router;
