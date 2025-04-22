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
    const { issueDescription } = req.body;

    if (!issueDescription) {
      return res.status(400).json({ message: "Description is required." });
    }

    const query = `
      INSERT INTO maintenance_requests (tenant_id, issue_description, status)
      VALUES ($1, $2, 'Pending') RETURNING *;
    `;

    const result = await client.query(query, [tenantId, issueDescription]);

    res.status(201).json({
      message: "Maintenance request submitted successfully.",
      request: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ message: "Failed to create request." });
  }
};

module.exports = { createRequest, getRequests, getUserRequest };
