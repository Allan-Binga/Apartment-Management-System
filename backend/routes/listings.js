const express = require("express");
const {
  getListings,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listings");
const { authLandlord } = require("../middleware/jwt");

const router = express.Router();

//Routes
router.get("/all-listings", getListings);
router.post("/create-listing", authLandlord, createListing);
router.put("/update-listing/:id", authLandlord, updateListing);
router.delete("/delete-listing/:id", authLandlord, deleteListing);

module.exports = router;
