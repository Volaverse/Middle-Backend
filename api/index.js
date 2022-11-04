const axios = require("axios");

const fetchNodeInfo = async () => {
  console.log("fetch node info")
  return axios.get("http://localhost:4000/api/node/info")
    .then((res) => res.data.data)
    .catch((error)=> console.log(error));
};

 const fetchAccountInfo = async (address) => {
  return axios.get(`http://localhost:4000/api/accounts/${address}`)
  .then((res) => res.data.data)
  .catch((error)=> console.log(error));
};

 const sendTransactions = async (tx) => {
  return axios.post("http://localhost:4000/api/transactions", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tx),
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

 const fetchAllNFTTokens = async () => {
  return axios.get("http://localhost:8080/api/nft_tokens")
    .then((res) => res.json())
    .then((res) => res.data);
};

 const fetchNFTToken = async (id) => {
  return axios.get(`http://localhost:8080/api/nft_tokens/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
};

 const getAllTransactions = async () => {
  return axios.get(`http://localhost:8080/api/transactions`)
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
};

module.exports= {fetchNodeInfo,fetchAccountInfo,sendTransactions,fetchAllNFTTokens,fetchNFTToken,getAllTransactions};