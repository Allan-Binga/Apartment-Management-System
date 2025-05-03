const express = require("express");
const {
  getNotifications,
  getMyNotifications,
  markNotificationAsRead,
} = require("../controllers/notifications");
const authAdminOrLandlord = require("../middleware/jwt2");
const { authTenant } = require("../middleware/jwt");

const router = express.Router();

router.get("/all", authAdminOrLandlord, getNotifications);
router.get("/my-notifications", authTenant, getMyNotifications);
router.put(
  "/my-notifications/:notificationId/mark-as-read",
  authTenant,
  markNotificationAsRead
);

module.exports = router;
