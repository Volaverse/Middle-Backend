# Overview
This Node.js backend provides a set of APIs that allow unity frontend to interact with the Lisk l2 blockchain. This project uses Node.js v18


# Getting Started
To use this backend, you will need to install the following dependencies:

Node.js v18



After cloning this repository

run npm install

Once you have installed the dependencies, you can start the backend by running the following command:

node server.js

This will start the backend on port 8000. You can then access the APIs by making HTTP requests to the backend.

APIs
The following are the APIs that are provided by this backend:

* /nftListings: This API returns a list of nfts listed on the marketplace

* /getUserWearables: This API returns the wearables nft owned by a user

* /getUserNfts: This API returns a list of all the Nfts owned by a user

* /getUsername: This API returns the username associated with a wallet address

* /getLandInfo: This API returns the information about a particular land parcel

* /checkTokenOwnership: This api is used to check wether a particular nft is owned by a particular address

* /blog: This api is returns the blog data which is used in the website

* /addInfo: This api is used to add user data in the mongoDB



## Examples
The following are some examples of how to use the APIs in this backend:

To get the nfts listed on the marketplace, you would make a GET request to the following URL:
http://localhost:8000/nftListings

To get a list of nfts owned by a user
http://localhost:8000/getUserNfts?address=userAddress

To get a list of wearable nfts owned by a user
http://localhost:8000/getUserWearables?address=userAddress

To get a information of a particular weabable nft owned by a user
http://localhost:8000/getUserWearables?address=userAddress&id=tokenId

To get a information of a particular land nft owned by a user
http://localhost:8000/getLandInfo?address=userAddress&tokenId=tokenId

To get check ownership  of a particular land nft 
http://localhost:8000/checkTokenOwnership?address=userAddress&tokenId=tokenId

To get blog data
http://localhost:8000/blog

To username associated with a wallet, you would make a POST request to the following URL:
http://localhost:8000/buy

The request body would contain the following JSON data:

    {
      "walletAddress":"address",
    }

To add information in mongoDb , you would make a POST request to the following URL:
http://localhost:8000/addInfo

The request body would contain the following JSON data:

    {
      "userName": "userName",
      "email": "emailId",
      "walletAddress":"address"
    }

# License
[Apache License](LICENSE)
