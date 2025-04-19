const client = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Tenant Registration
const registerTenant = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    apartmentNumber,
    leaseStartDate,
    leaseEndDate,
    password,
  } = req.body;

  //Check if all fields exist
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !apartmentNumber ||
    !leaseStartDate ||
    !leaseEndDate
  ) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

  // VALIDATE EMAIL FORMAT
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // VALIDATE PASSWORD STRENGTH
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  try {
    // Check if tenant already exists by email
    const checkTenantQuery = "SELECT * FROM tenants WHERE email = $1";
    const existingTenant = await client.query(checkTenantQuery, [email]);

    if (existingTenant.rows.length > 0) {
      return res
        .status(409)
        .json("You already registered. Please login to proceed.");
    }

    //Check if apartment exists in listing
    const listingCheckQuery =
      "SELECT * FROM apartment_listings WHERE apartmentNumber = $1";
    const listingResult = await client.query(listingCheckQuery, [
      apartmentNumber,
    ]);

    if (listingResult.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "The selected apartment does not exist." });
    }

    //Check if apartment is already occupied
    const occupancyCheckQuery =
      "SELECT * FROM tenants WHERE apartmentNumber = $1";
    const occupied = await client.query(occupancyCheckQuery, [apartmentNumber]);

    if (occupied.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "This apartment is already occupied." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new tenant into the database
    const insertTenantQuery = `
      INSERT INTO tenants (firstName, lastName, email, phoneNumber, apartmentNumber, leaseStartDate, leaseEndDate, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, firstName, lastName, email, phoneNumber, apartmentNumber, leaseStartDate, leaseEndDate
    `;

    //Save Tenant to PostgreSQL
    const newTenant = await client.query(insertTenantQuery, [
      firstName,
      lastName,
      email,
      phoneNumber,
      apartmentNumber,
      leaseStartDate,
      leaseEndDate,
      hashedPassword,
    ]);

    res.status(201).json({
      message: "You have registered successfully.",
      tenant: newTenant.rows[0],
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json("Internal server error.");
  }
};

// Tenant Login
const loginTenant = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if tenant exists by email
    const checkTenantQuery = "SELECT * FROM tenants WHERE email = $1";
    const tenant = await client.query(checkTenantQuery, [email]);

    if (tenant.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(
      password,
      tenant.rows[0].password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Create JWT tenant token
    const tenantToken = jwt.sign(
      { tenant: tenant.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" } // Token expires in 24 hours
    );

    // Set JWT token in the cookie
    res.cookie("tenantSession", tenantToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    // Return success message
    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Tenant Logout
const logoutTenant = async (req, res) => {
  try {
    //Check if cookie exists
    if (!req.cookies || !req.cookies.tenantSession) {
      return res.status(400).json({ message: "You are not logged in." });
    }

    //Clear session cookie
    res.clearCookie("tenantSession");
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    res.status(500).json({ error: "Error loggin out." });
  }
};

//Landlord Registration
const registerLandlord = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  //Check if all fields are intact
  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

  //validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  //Password Strength
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }
  try {
    //Check if landlord exists
    const checkLandlordQuery = "SELECT * FROM landlords WHERE email = $1";
    const existingLandlord = await client.query(checkLandlordQuery, [email]);

    if (existingLandlord.rows.length > 0) {
      return res
        .status(409)
        .json("You already registered. Please login to proceed.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Insert into database
    const insertLandlordQuery = `
      INSERT INTO landlords (firstName, lastName, email, phoneNumber, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, firstName, lastName, email, phoneNumber
    `;

    //Save to PostgreSQL
    const newLandlord = await client.query(insertLandlordQuery, [
      firstName,
      lastName,
      email,
      phoneNumber,
      hashedPassword,
    ]);

    res.status(201).json({
      message: "Landlord registered successfully.",
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json("Internal server error.");
  }
};

//Landlord Login
const loginLandlord = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Check if landlord exists
    const checkLandlordQuery = "SELECT * FROM landlords WHERE email = $1";
    const landlord = await client.query(checkLandlordQuery, [email]);

    if (landlord.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(
      password,
      landlord.rows[0].password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    //Create JWT landlord token
    const landlordToken = jwt.sign(
      { landlord: landlord.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Set JWT token in the cookie
    res.cookie("landlordSession", landlordToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    // Return success message
    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Landord Logout
const logoutLandlord = async (req, res) => {
  try {
    //Check if cookie exists
    if (!req.cookies || !req.cookies.landlordSession) {
      return res.status(400).json({ message: "You are not logged in." });
    }

    //Clear session cookie
    res.clearCookie("landlordSession");
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    res.status(500).json({ error: "Error loggin out." });
  }
};

//Admin  Registration
const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  //Check all fields is they exist
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

  //Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  //Password Strength
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  try {
    //Check if Admin exists
    const checkAdminQuery = "SELECT * FROM admins WHERE email = $1";
    const existingAdmin = await client.query(checkAdminQuery, [email]);

    if (existingAdmin.rows.length > 0) {
      return res
        .status(409)
        .json("You are already registered. Please login to proceed.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Insert into database
    const insertAdminQuery = `
      INSERT INTO admins (email, password)
      VALUES ($1, $2)
      RETURNING id, email
    `;

    //Save to postgreSQL
    const newAdmin = await client.query(insertAdminQuery, [
      email,
      hashedPassword,
    ]);

    res.status(201).json({
      message: "Admin registered successfully.",
      admin: newAdmin.rows[0],
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json("Internal server error.");
  }
};

//Login Admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Check if admin exists
    const checkAdminQuery = "SELECT * FROM admins WHERE email = $1";
    const admin = await client.query(checkAdminQuery, [email]);

    if (admin.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //Check if password is valid
    const isPasswordValid = await bcrypt.compare(
      password,
      admin.rows[0].password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Create JWT tenant token
    const adminToken = jwt.sign(
      { admin: admin.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" } // Token expires in 24 hours
    );

    // Set JWT token in the cookie
    res.cookie("adminSession", adminToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    //Return success
    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Logout Admin
const logoutAdmin = async (req, res) => {
  try {
    //Check if cookie exists
    if (!req.cookies || !req.cookies.adminSession) {
      return res.status(400).json({ message: "You are not logged in." });
    }

    //Clear admin cookie
    res.clearCookie("adminSession");
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    res.status(500).json({ error: "Error loggin out." });
  }
};

module.exports = {
  registerTenant,
  loginTenant,
  logoutTenant,
  registerLandlord,
  loginLandlord,
  logoutLandlord,
  registerAdmin,
  loginAdmin,
  logoutAdmin,
};
