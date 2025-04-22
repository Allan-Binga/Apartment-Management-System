const express = require("express");
const {
  getListings,
  getUserLeasedApartment,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listings");
const { authLandlord, authTenant } = require("../middleware/jwt");

const router = express.Router();

//Routes
router.get("/all-listings", getListings);
router.get("/my-listing", authTenant ,getUserLeasedApartment);
router.post("/create-listing", authLandlord, createListing);
router.put("/update-listing/:id", authLandlord, updateListing);
router.delete("/delete-listing/:id", authLandlord, deleteListing);

module.exports = router;
