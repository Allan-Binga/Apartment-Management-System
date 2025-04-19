const client = require("../config/db");

//Fetch all listings
const getListings = async (req, res) => {
  try {
    const listings = await client.query("SELECT * FROM apartment_listings");
    res.status(200).json(listings.rows);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch listings." });
  }
};

// Create Apartment Listings
const createListing = async (req, res) => {
  try {
    const { title, description, price, square_feet, image, apartmentNumber } =
      req.body;

    // Validate input
    if (
      !title ||
      !description ||
      !price ||
      !square_feet ||
      !image ||
      !apartmentNumber
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const insertListingQuery = `
      INSERT INTO apartment_listings (
        title,
        description,
        price,
        square_feet,
        image,
        apartmentNumber,
        created_at,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      RETURNING id, title, description, price, square_feet, image, apartmentNumber, created_at, updated_at
    `;

    const result = await client.query(insertListingQuery, [
      title,
      description,
      price,
      square_feet,
      image,
      apartmentNumber,
    ]);

    res.status(201).json({
      message: "Listing created successfully.",
      listing: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ message: "Could not create listing." });
  }
};

module.exports = { getListings, createListing };
