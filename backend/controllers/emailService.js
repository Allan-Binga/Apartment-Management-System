const nodemailer = require("nodemailer");
const client = require("../config/db");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

//Send Verification Email
const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/account-verification?token=${token}`;

  const mailOptions = {
    from: `"Murandi Apartments" <${process.env.MAIL_USER}>`, //Name and Email
    to: email,
    subject: "Please verify your account.",
    html: `  <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333;">Verify Your Account</h2>
          <p style="color: #555;">Click the button below to verify your account.</p>
          <a href="${verificationUrl}" 
            style="display: inline-block; padding: 10px 20px; margin-top: 15px; background-color: #2582b8; color: #fff; text-decoration: none; border-radius: 5px;">
            Verify My Account
          </a>
          <p style="margin-top: 20px; color: #777;">If you did not create an account, you can ignore this email.</p>
        </div>
      </div>`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

//Verify token sent in verification email
const verifyVerificationToken = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const findTenantQuery = `
      SELECT * FROM tenants WHERE verificationtoken = $1
    `;

    const result = await client.query(findTenantQuery, [hashedToken]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const tenant = result.rows[0];

    if (new Date(tenant.verificationtokenexpiry) < new Date()) {
      return res.status(400).json({
        message: "Token expired. Please request a new verification email.",
        email: tenant.email,
      });
    }

    const updateTenantQuery = `
      UPDATE tenants
      SET isverified = true
      WHERE id = $1
    `;
    await client.query(updateTenantQuery, [tenant.id]);

    // await sendAccountConfirmationEmail(tenant.email);

    await user.save();
    res.json({ message: "Account verified successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Resent verification email after token expires
const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    //Check if tenant exisits
    const findTenantQuery = `SELECT * FROM tenants WHERE email =$1`;
    const result = await client.query(findTenantQuery, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Tenant not found." });
    }

    const tenant = result.rows[0];

    //Check if account is already verified
    if (tenant.isverified) {
      return res
        .status(400)
        .json({ message: "Account is already verified. Please login." });
    }

    // Generate new verification token
    const plainToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(plainToken)
      .digest("hex");

    const newExpiry = new Date(Date.now() + 2 * 60 * 1000);

    //Update tenant's token and expiry
    const updateTokenQuery = `
       UPDATE tenants 
      SET verificationtoken = $1, verificationtokenexpiry = $2 
      WHERE email = $3
      `;

    await client.query(updateTokenQuery, [hashedToken, newExpiry, email]);

    //Send verification email
    await sendVerificationEmail(email, plainToken);

    return res
      .status(200)
      .json({ message: "Verification email resent successfully." });
  } catch (error) {
    console.error("Error resending verification email:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { sendVerificationEmail, verifyVerificationToken, resendVerificationEmail };
