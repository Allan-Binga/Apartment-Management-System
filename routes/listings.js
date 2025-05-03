const express = require("express");
const {
  getListings,
  getUserLeasedApartment,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listings");
const {  authTenant } = require("../middleware/jwt");
const authAdminOrLandlord = require("../middleware/jwt2")

const router = express.Router();

//Routes
router.get("/all-listings", getListings);
router.get("/my-listing", authTenant, getUserLeasedApartment);
router.post("/create-listing", authAdminOrLandlord, createListing);
router.put("/update-listing/:id", updateListing);
router.delete("/delete-listing/:id",  deleteListing);

module.exports = router;
