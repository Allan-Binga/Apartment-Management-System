// db.js
const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client
  .connect()
  .then(() => console.log("Database connected successfully."))
  .catch((error) => console.log("Error connecting to database", error));

module.exports = client;
