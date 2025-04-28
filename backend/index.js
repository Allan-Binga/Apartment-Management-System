const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const listingsRoute = require("./routes/listings");
const paymentRoute = require("./routes/payments");
const maintenanceRequestRoute = require("./routes/maintenanceRequest");
const checkoutRoute = require("./routes/rentCheckout");
const webhookRoute = require("./routes/webhook");
const emailRoute = require("./routes/emailService");
const tenantRoute = require("./routes/tenants");
const reportRoute = require("./routes/reports");

require("./config/db");

dotenv.config();
const app = express();

//Webhook Route
app.use("/murandi/v1/webhook", webhookRoute);

app.use(express.json());

//Cookie Parser
app.use(cookieParser());

//CORS
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/murandi/v1/auth", authRoute);
app.use("/murandi/v1/verify", emailRoute);
app.use("/murandi/v1/users", usersRoute);
app.use("/murandi/v1/tenants", tenantRoute);
app.use("/murandi/v1/listings", listingsRoute);
app.use("/murandi/v1/payments", paymentRoute);
app.use("/murandi/v1/maintenance", maintenanceRequestRoute);
app.use("/murandi/v1/checkout", checkoutRoute);
app.use("/murandi/v1/reports", reportRoute)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5700;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
