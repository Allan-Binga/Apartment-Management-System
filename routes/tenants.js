const express = require("express");
const { updateInformation, deleteTenant } = require("../controllers/tenants");
const { authTenant } = require("../middleware/jwt");

const router = express.Router();

//Landlord
router.put("/landlord/update/:id", updateInformation);
router.delete("/landlord/remove/:id",  deleteTenant);

//Tenant
router.put("/tenant/update/:id", authTenant, updateInformation);
router.delete("/tenant/remove/:id", authTenant, deleteTenant);

module.exports = router;
