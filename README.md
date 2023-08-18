# Overview
This Node.js backend provides a set of APIs that allow unity frontend to interact with the Lisk blockchain. This project uses Node.js v16.15.0 and lisk-sdk 5.2.2


# Getting Started
To use this backend, you will need to install the following dependencies:

Node.js v16.15.0

Running blockchain on localhost .To run the blockchain on your localhost, you can follow the instructions provided in the [Volaverse/Blockchain-lisk](https://github.com/Volaverse/Blockchain-lisk) repository

After Installing node and cloning this repository

run npm install

Once you have installed the dependencies, you can start the backend by running the following command:

node server.js

This will start the backend on port 8000. You can then access the APIs by making HTTP requests to the backend.

APIs
The following are the APIs that are provided by this backend:

/tokenInfo: This API returns a list of all tokens

/buy: This API is used to buy the nft.

/sell: This API is used to sell the nft.

/info: This API returns information about the blockchain.

/tokenInfo: This API returns a list of Nfts with relevant information

/login: This API is used to login.It returns the lisk address

/create: This API is used to create lisk account with 5 lsk faucets

## Examples
The following are some examples of how to use the APIs in this backend:

To create new credentials with 5 lsk faucet, you would make a GET request to the following URL:
http://localhost:8000/create

To get a list of all nft with relevant information in the blockchain, you would make a GET request to the following URL:
http://localhost:8000/tokenInfo

To get information about blockchain, you would make a GET request to the following URL:
http://localhost:8000/info

To create a buy a nft, you would make a POST request to the following URL:
http://localhost:8000/buy

The request body would contain the following JSON data:

    {
      "name":"Name",
      "id":"Id",
      "passphrase":"passphrase for account",
      "fee":"Transaction fee",
      "purchaseValue":"Purchase Value"
    }

To sell a nft, you would make a POST request to the following URL:
http://localhost:3000/sell


The request body would contain the following JSON data:


    {
      "name":"Name",
      "id":"Id",
      "passphrase":"passphrase for account",
      "fee":"Transaction fee",
      "minPurchaseMargin":"Minimum Purchase Value"
    }



To login through passphrase, you would make a POST request to the following URL:
http://localhost:3000/login

The request body would contain the following JSON data:

    {
       "passphrase": "passphrase"
    }


# License
[Apache License](LICENSE)
