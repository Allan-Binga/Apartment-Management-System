const dotenv = require("dotenv");
const Stripe = require("stripe");
const client = require("../config/db");

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createRentCheckoutSession = async (req, res) => {
  const tenantId = req.tenantId;
  const { amountPaid, paymentDate } = req.body;
  try {
    //Save as 'pending' first
    const insertPaymentQuery = `
      INSERT INTO payment (tenantid, amountpaid, paymentdate, paymentmethod, paymentstatus)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING paymentid
    `;

    const values = [tenantId, amountPaid, paymentDate, "stripe", "pending"];

    const result = await client.query(insertPaymentQuery, values);
    const paymentId = result.rows[0].paymentid;

    //Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Rent Payment for Tenant ${tenantId}`,
            },
            unit_amount: amountPaid * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        paymentId: paymentId.toString(),
        tenantId: tenantId.toString(),
      },
    });

    res.status(200).json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating rent checkout session:", error.message);
    console.log(error)
    res.status(500).json({ error: "Failed to create checkout session." });
  }
};

module.exports = { createRentCheckoutSession };
