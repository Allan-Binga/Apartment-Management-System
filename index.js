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
const receiptsRoute = require("./routes/receipts");
const notificationRoute = require("./routes/notifications")
const passwordRoute = require("./routes/password")

require("./config/db");

dotenv.config();
const app = express();

//Webhook Route
app.use("/murandi/v1/webhook", webhookRoute);

app.use(express.json());

// CORS setup: handle local and production environments
const allowedOrigins = [
  "http://localhost:5173",
  "https://murandi-apartments-d3ba7e492c04.herokuapp.com",
  "https://master.dw58fbfwlqgb9.amplifyapp.com"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

//Cookie Parser
app.use(cookieParser());

// Routes
app.use("/murandi/v1/auth", authRoute);
app.use("/murandi/v1/verify", emailRoute);
app.use("/murandi/v1/users", usersRoute);
app.use("/murandi/v1/tenants", tenantRoute);
app.use("/murandi/v1/listings", listingsRoute);
app.use("/murandi/v1/payments", paymentRoute);
app.use("/murandi/v1/maintenance", maintenanceRequestRoute);
app.use("/murandi/v1/checkout", checkoutRoute);
app.use("/murandi/v1/reports", reportRoute);
app.use("/murandi/v1/receipts", receiptsRoute);
app.use("/murandi/v1/notifications", notificationRoute)
app.use("/murandi/v1/password", passwordRoute)

if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.join(__dirname, "client", "dist");

  app.use(express.static(clientDistPath));

  // Fallback only for frontend routes.
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/murandi")) {
      res.sendFile(path.join(clientDistPath, "index.html"));
    } else {
      next();
    }
  });
}

const PORT = process.env.PORT || 5700;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
