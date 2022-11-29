const axios = require("axios");
// serverIp-13.230.167.238
const { transactions, cryptography } =require ("@liskhq/lisk-client");

// const { Buffer } =require ("lisk-sdk");

const host="http://13.230.167.238"
const fetchNodeInfo = async () => {
  console.log("fetch node info")
  return axios.get("c:4000/api/node/info")
    .then((res) => res.data.data)
    .catch((error) => console.log(error));
};

const fetchAccountInfo = async (address) => {
  return axios.get(host+`:4000/api/accounts/${address}`)
    .then((res) => res.data.data)
    .catch((error) => console.log(error));
};

const sendTransactions = async (tx) => {
  return axios.post(host+":4000/api/transactions", JSON.stringify(tx), {
    headers: {
      "Content-Type": "application/json",
    }
  }).then((res) =>{console.log("resp status is "+res.status);console.log("data is ",res.data);return res})
    .catch((error) => console.log(error));
};

const fetchAllNFTTokens = async () => {
  return axios.get(host+":8080/api/nft_tokens")
  .then((res) => {
  var response='';
  if(res.data.data && res.data.data.length>0)
  {
     response =res.data.data.map((x) => {x.ownerAddress=cryptography.getBase32AddressFromAddress(Buffer.from(x.ownerAddress, 'hex'), 'lsk').toString('binary');
    x.value =  transactions.convertBeddowsToLSK(String(x.value));
    return x;
  })
  if(response){return response}
  return res.data.data

  }
  
  return res.data.data})
  .catch((error) => console.log(error));
};

const fetchNFTToken = async (id) => {
  return axios.get(host+`:8080/api/nft_tokens/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
};

const getAllTransactions = async () => {
  return axios.get(host+`:8080/api/transactions`)
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
};

module.exports = { fetchNodeInfo, fetchAccountInfo, sendTransactions, fetchAllNFTTokens, fetchNFTToken, getAllTransactions };