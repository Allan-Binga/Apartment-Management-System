const client = require("../config/db")

//Get All Payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await client.query("SELECT * FROM payment")
    res.status(200).json(payments.rows)
  } catch (error) {
    res.status(500).json({message: "Could not fetch payments."})
  }
};

//Get User's Payment
const getUsersPayment = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = { getAllPayments, getUsersPayment };
