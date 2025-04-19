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

//Update a listing
const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body;

    if (Object.keys(fields).length === 0) {
      return res
        .status(400)
        .json({ message: "No fields provided for update." });
    }

    // Build dynamic SET clause
    const setClauses = [];
    const values = [];
    let index = 1;

    for (const key in fields) {
      setClauses.push(`${key} = $${index}`);
      values.push(fields[key]);
      index++;
    }

    // Always update updated_at
    setClauses.push(`updated_at = NOW()`);

    const updateQuery = `
      UPDATE apartment_listings
      SET ${setClauses.join(", ")}
      WHERE id = $${index}
      RETURNING *
    `;

    values.push(id); // final value is the id

    const result = await client.query(updateQuery, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.status(200).json({
      message: "Listing updated successfully.",
      listing: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ message: "Could not update listing." });
  }
};

//Delete a listing
const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteQuery = `DELETE FROM apartment_listings WHERE id = $1 RETURNING *`;
    const result = await client.query(deleteQuery, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.status(200).json({
      message: "Listing deleted successfully.",
      deleted: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ message: "Could not delete listing." });
  }
};

module.exports = { getListings, createListing, updateListing, deleteListing };
