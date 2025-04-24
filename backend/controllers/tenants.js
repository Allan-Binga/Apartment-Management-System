const client = require("../config/db");

//Update tenant information
const updateInformation = async (req, res) => {
  const tenantId = req.params.id;
  const { firstName, lastName, leaseEndDate, email, phone } = req.body;

  const isUserLandlord = !!req.cookies.landlordSession;

  try {
    // Check if tenant exists
    const checkQuery = "SELECT * FROM tenants WHERE id = $1";
    const checkResult = await client.query(checkQuery, [tenantId]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: "Tenant not found." });
    }

    // Build dynamic update query
    const fields = [];
    const values = [];
    let counter = 1;

    if (firstName) {
      fields.push(`firstName = $${counter++}`);
      values.push(firstName);
    }
    if (lastName) {
      fields.push(`lastName = $${counter++}`);
      values.push(lastName);
    }

    if (email) {
      fields.push(`email = $${counter++}`);
      values.push(email);
    }
    if (phone) {
      fields.push(`phone = $${counter++}`);
      values.push(phone);
    }

    //Lease End Date can only be updated by landord.
    if (leaseEndDate) {
      if (isUserLandlord) {
        fields.push(`leaseEndDate = $${counter++}`);
        values.push(leaseEndDate);
      } else {
        return res.status(403).json({
          message: "Only landlords can update this field!",
        });
      }
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No data provided for update." });
    }

    const updateQuery = `
        UPDATE tenants 
        SET ${fields.join(", ")}
        WHERE id = $${counter}
        RETURNING *;
      `;
    values.push(tenantId);

    const updateResult = await client.query(updateQuery, values);

    res.status(200).json({
      message: "Tenant information updated successfully.",
      tenant: updateResult.rows[0],
    });
  } catch (error) {
    console.error("Update Tenant Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Delete tenant from the system
const deleteTenant = async (req, res) => {
  const tenantId = req.params.id;

  try {
    //Retrieve apartment number for the tenant
    const getTenantQuery = "SELECT apartmentnumber FROM tenants WHERE id = $1";
    const tenantResult = await client.query(getTenantQuery, [tenantId]);

    if (tenantResult.rows.length === 0) {
      return res.status(404).json({ message: "Tenant not found." });
    }

    const apartmentNumber = tenantResult.rows[0].apartmentnumber;

    const deleteTenantQuery = "DELETE FROM tenants WHERE id = $1";
    await client.query(deleteTenantQuery, [tenantId]);

    const updateApartmentStatusQuery = `
    UPDATE apartment_listings 
    SET leasingstatus = 'Unleased' 
    WHERE apartmentnumber = $1
  `;
    await client.query(updateApartmentStatusQuery, [apartmentNumber]);

    res
      .status(200)
      .json({ message: "Tenant deleted and apartment marked as Empty." });
  } catch (error) {
    console.error("Delete Tenant Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { updateInformation, deleteTenant };
