/* eslint-disable no-undef */
// using api client to connect with blockchain
const { apiClient } = require("@liskhq/lisk-client");
require("dotenv").config();
let clientCache;
const getClient = async () => {
  if (!clientCache) {
    clientCache = await apiClient.createWSClient(process.env.REQUESR_URL);
  }
  return clientCache;
};
// to invoke actions on blockchain
const apiClientReq = async (url, param) => {
  try {
    const client = await getClient();
    const resp = await client.invoke(url, param);
    return resp;
  } catch (error) {
    throw new Error(error);
  }
};
// to send transcation to blockchain
const clientTxnReq = async (tx, passphrase) => {
  const client = await getClient();
  const transaction = await client.transaction.create(tx, passphrase);
  let resp = "";
  try {
    resp = await client.transaction.send(transaction);
    return resp;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  apiClientReq,
  clientTxnReq,
};
