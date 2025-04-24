const client = require("../config/db");

//Get all maintenance requests.
const getRequests = async (req, res) => {
  try {
    const query = `
     SELECT maintenance_requests.*, tenants.firstname, tenants.lastname
    FROM maintenance_requests
    JOIN tenants ON maintenance_requests.tenant_id = tenants.id
    ORDER BY request_date DESC;

    `;

    const result = await client.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch requests." });
  }
};

//Get a user's maintenance request.
const getUserRequest = async (req, res) => {
  try {
    const tenantId = req.tenantId;

    const query = `
      SELECT * FROM maintenance_requests
      WHERE tenant_id = $1
      ORDER BY request_date DESC;
    `;

    const result = await client.query(query, [tenantId]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching tenant requests:", error);
    res.status(500).json({ message: "Failed to fetch tenant requests." });
  }
};

//Create a maintenance requests.
const createRequest = async (req, res) => {
  try {
    const tenantId = req.tenantId;
    const { issueDescription, category } = req.body;

    if (!issueDescription || !category) {
      return res
        .status(400)
        .json({ message: "Description and category are required." });
    }

    // Step 1: Insert the maintenance request
    const insertQuery = `
      INSERT INTO maintenance_requests (tenant_id, issue_description, status, category)
      VALUES ($1, $2, 'Pending', $3) RETURNING *;
    `;

    const result = await client.query(insertQuery, [tenantId, issueDescription, category]);
    const request = result.rows[0];

    // Step 2: Find a technician that matches the category
    const techResult = await client.query(
      `SELECT id FROM technicians WHERE specialty = $1 ORDER BY RANDOM() LIMIT 1`,
      [category]
    );

    const technician = techResult.rows[0];

    if (technician) {
      // Step 3: Assign technician to this request
      await client.query(
        `UPDATE maintenance_requests SET technician_id = $1 WHERE id = $2`,
        [technician.id, request.id]
      );
      request.technician_id = technician.id; // optional, to show in response
    }

    res.status(201).json({
      message: technician
        ? "Request submitted and technician assigned."
        : "Request submitted but no technician available for this category.",
      request,
    });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ message: "Failed to create request." });
  }
};


module.exports = { createRequest, getRequests, getUserRequest };
