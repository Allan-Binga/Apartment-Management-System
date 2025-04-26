const dotenv = require("dotenv");
const Stripe = require("stripe");
const client = require("../config/db");

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createRentCheckoutSession = async (req, res) => {
  const tenantId = req.tenantId;

  try {
    //Find Tenant Apartment's Number
    const tenantQuery = `SELECT apartmentnumber FROM tenants WHERE id = $1`;
    const tenantResult = await client.query(tenantQuery, [tenantId]);

    if (tenantResult.rows.length === 0) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    const apartmentNumber = tenantResult.rows[0].apartmentnumber;

    //Get rent amount from apartment_listings
    const rentQuery = `SELECT price, IMAGE FROM apartment_listings WHERE apartmentnumber = $1`;
    const rentResult = await client.query(rentQuery, [apartmentNumber]);

    if (rentResult.rows.length === 0) {
      return res.status(404).json({ error: "Apartment listing not found" });
    }

    const { price: rentAmount, image: apartmentImage } = rentResult.rows[0];

    //Current Date
    const today = new Date().toISOString().split("T")[0];

    const insertPaymentQuery = `
      INSERT INTO payment (tenantid, amountpaid, paymentdate, paymentmethod, paymentstatus)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING paymentid
    `;

    const values = [tenantId, rentAmount, today, "stripe", "pending"];
    const result = await client.query(insertPaymentQuery, values);
    const paymentId = result.rows[0].paymentid;


    //Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "kes",
            product_data: {
              name: `Rent Payment for Tenant ${tenantId}`,
              images: apartmentImage ? [apartmentImage] : [],
            },
            unit_amount: rentAmount * 100, // Cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancelled`,
      metadata: {
        paymentId: paymentId.toString(),
        tenantId: tenantId.toString(),
      },
      payment_intent_data: {
        metadata: {
          paymentId: paymentId.toString(),
          tenantId: tenantId.toString(),
        },
      },
    });

    res.status(200).json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating rent checkout session:", error.message);
    res.status(500).json({ error: "Failed to create checkout session." });
  }
};

module.exports = { createRentCheckoutSession };
