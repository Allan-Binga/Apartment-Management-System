const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const listingsRoute = require("./routes/listings")

require("./config/db")

dotenv.config();
const app = express();

app.use(express.json());

//Cookie Parser
app.use(cookieParser())

// Routes
app.use("/murandi/v1/auth", authRoute);
app.use("/murandi/v1/users", usersRoute);
app.use("/murandi/v1/listings", listingsRoute)

app.listen(5700, () => {
  console.log("Server started on port 5700");
});
