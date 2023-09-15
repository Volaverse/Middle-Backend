/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../server");
require("dotenv").config();

describe("Create request", () => {
  it("responds with 200 OK", async () => {
    const response = await request(app).get("/create");
    expect(response.status).toBe(200);
  });
});
describe("Token information request", () => {
  it("responds with 200 OK", async () => {
    const response = await request(app).get("/tokenInfo");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
  describe("login request", () => {
    it("should return display address", async () => {
      const newUser = {
        passphrase:
          "setup spread resemble tag flock melody such best total walk swamp siren",
      };
      const response = await request(app).post("/login").send(newUser);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("display_add");
    });
  });

  describe("info", () => {
    it("should return information about blockchain", async () => {
      const response = await request(app).post("/info").send();

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
    });
  });
  describe("add faucet request", () => {
    it("should add faucet to the recipient address", async () => {
      const data = {
        recipientAddress: "16c70194f16fa137d96168823f695d2ddb232554",
        amount: "10",
        fee: "1",
      };
      await new Promise((resolve) => setTimeout(resolve, 11000));
      const response = await request(app).post("/addFaucet").send(data);
      expect(response.status).toBe(200);
    });
  });
 // After running the test once you need to change the name as it has to be unique
  describe("create nft request", () => {
    it("should send create  nft request", async () => {
      const data = {
        name: "nft test",
        description: "description test",
        initValue: "1",
        imageUrl: "test",
        category: 3,
        passphrase: process.env.TEST_PASSPHRASE,
        fee: "1",
        minPurchaseMargin: "1",
      };
      await new Promise((resolve) => setTimeout(resolve, 11000));
      const response = await request(app).post("/createNft").send(data);
      expect(response.status).toBe(200);
    });
  });

  describe("sell request", () => {
    it("should send sell request", async () => {
      const data = {
        name: "nft 1",
        id: process.env.TOKEN_ID,
        passphrase: process.env.TEST_PASSPHRASE,
        fee: "1",
        minPurchaseMargin: "1",
      };
      await new Promise((resolve) => setTimeout(resolve, 11000));
      const response = await request(app).post("/sell").send(data);
      expect(response.status).toBe(200);
    });
  });
  // After running the test once you need to increase the purchase value as the price of the nft is increased
  describe("buy request", () => {
    it("should send buy request", async () => {
      const data = {
        name: "nft 1",
        id: process.env.TOKEN_ID,
        passphrase: process.env.TEST_PASSPHRASE,
        fee: "1",
        purchaseValue: "3",
      };
      await new Promise((resolve) => setTimeout(resolve, 11000));
      const response = await request(app).post("/buy").send(data);
      expect(response.status).toBe(200);
    });
  });
});
