const request = require("supertest");
const app = require("../index");
const client = require("../config/db");

jest.mock("../config/db", () => ({
  query: jest.fn(),
  end: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  client.query.mockReset();
});

afterAll(async () => {
  await client.end();
});

describe("Auth Tests", () => {
  describe("Tenant Registration", () => {
    test("User can register successfully", async () => {
      client.query
        .mockResolvedValueOnce({ rows: [{ apartmentNumber: "101A" }] }) // Apartment listing check
        .mockResolvedValueOnce({ rows: [] }) // Tenant email check
        .mockResolvedValueOnce({ rows: [] }) // Tenant phone check
        .mockResolvedValueOnce({ rows: [] }) // Apartment occupancy check
        .mockResolvedValueOnce({
          rows: [{ id: 1, email: "testuser@example.com" }],
        }) // Tenant insertion
        .mockResolvedValueOnce({ rows: [] }) // Apartment status update
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      const response = await request(app)
        .post("/murandi/v1/auth/register/tenant")
        .send({
          firstName: "John",
          lastName: "Doe",
          email: "testuser@example.com",
          phoneNumber: "1234567890",
          apartmentNumber: "101A",
          leaseStartDate: "2024-12-01",
          leaseEndDate: "2025-03-01",
          password: "Password123!",
        });

      if (response.status !== 201) {
        console.log("Response body:", response.body);
      }

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("tenant");
      expect(response.body.tenant.email).toBe("testuser@example.com");
    });
  });
});
