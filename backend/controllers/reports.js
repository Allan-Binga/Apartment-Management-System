const client = require("../config/db");

//Get reports
const getReports = async (req, res) => {
  try {
    const reports = await client.query("SELECT * FROM reports");
    res.status(200).json(reports.rows);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch reports" });
  }
};

//Get payment reports
const getPaymentReports = async (req, res) => {
  try {
    const paymentReports = await client.query(`
        SELECT id, report_type, tenant_name, apartment_id, amount_paid, payment_date, payment_status, created_at
        FROM reports
        WHERE report_type = 'payment'
      `);
    res.status(200).json(paymentReports.rows);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch payment reports" });
  }
};

// Create Payment Report
const createPaymentReport = async (reportData) => {
  const {
    tenant_name,
    apartment_id,
    amount_paid,
    payment_date,
    payment_status,
  } = reportData;

  if (
    !tenant_name ||
    !apartment_id ||
    !amount_paid ||
    !payment_date ||
    !payment_status
  ) {
    throw new Error("All fields are required");
  }

  try {
    const query = `
        INSERT INTO reports (report_type, tenant_name, apartment_id, amount_paid, payment_date, payment_status, created_at)
        VALUES ('payment', $1, $2, $3, $4, $5, NOW()) RETURNING *;
      `;

    const values = [
      tenant_name,
      apartment_id,
      amount_paid,
      payment_date,
      payment_status,
    ];

    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating payment report:", error.message);
    throw error;
  }
};

module.exports = { getReports, getPaymentReports, createPaymentReport };
