const axios = require("axios");
// serverIp-13.230.167.238
const fetchNodeInfo = async () => {
  console.log("fetch node info")
  return axios.get("http://13.230.167.238:4000/api/node/info")
    .then((res) => res.data.data)
    .catch((error) => console.log(error));
};

const fetchAccountInfo = async (address) => {
  return axios.get(`http://13.230.167.238:4000/api/accounts/${address}`)
    .then((res) => res.data.data)
    .catch((error) => console.log(error));
};

const sendTransactions = async (tx) => {
  return axios.post("http://13.230.167.238:4000/api/transactions", JSON.stringify(tx), {
    headers: {
      "Content-Type": "application/json",
    }
  }).then((res) =>{console.log("resp status is "+res.status);console.log("data is ",res.data);return res})
    .catch((error) => console.log(error));
};

const fetchAllNFTTokens = async () => {
  return axios.get("http://13.230.167.238:8080/api/nft_tokens")
  .then((res) => res.data.data)
  .catch((error) => console.log(error));
};

const fetchNFTToken = async (id) => {
  return axios.get(`http://13.230.167.238:8080/api/nft_tokens/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
};

const getAllTransactions = async () => {
  return axios.get(`http://13.230.167.238:8080/api/transactions`)
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
};

module.exports = { fetchNodeInfo, fetchAccountInfo, sendTransactions, fetchAllNFTTokens, fetchNFTToken, getAllTransactions };