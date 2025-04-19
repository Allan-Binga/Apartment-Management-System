const express = require("express");
const { getListings, createListing } = require("../controllers/listings");

const router = express.Router();

//Routes
router.get("/all-listings", getListings);
router.post("/create-listing", createListing);

module.exports = router;
