const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const client = require("../config/db");

const handleWebhook = async (req, res) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK;
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    return res.status(400).send("Webhook error.");
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const paymentId = session.metadata?.paymentId;

      try {
        if (paymentId) {
          const updateQuery = `UPDATE payment SET paymentstatus = $1 WHERE paymentid = $2`;
          await client.query(updateQuery, ["paid", paymentId]);
          console.log(`Payment ${paymentId} marked as paid`);
        }
      } catch (error) {
        console.error("Failed to mark payment as paid:", error.message);
      }
      break;

    case "payment_intent.payment_failed":
      const failedIntent = event.data.object;
      const failedPaymentId = failedIntent.metadata?.paymentId;

      try {
        if (failedPaymentId) {
          const updateQuery = `UPDATE payment SET paymentstatus = $1 WHERE paymentid = $2`;
          await client.query(updateQuery, ["failed", failedPaymentId]);
          console.log(`Payment ${failedPaymentId} marked as failed`);
        }
      } catch (error) {
        console.error("Failed to mark payment as failed:", error.message);
      }
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).send("Webhook received.");
};

module.exports = { handleWebhook };
