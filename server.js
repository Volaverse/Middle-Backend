/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose=require("mongoose");
const port = 8000;
const morgan = require("morgan");
require('dotenv').config();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./app/routes")(app);
mongoose
  .connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,useUnifiedTopology: true 
    }
  )
  .then(() => {
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
  })
  .catch((err) => {
    console.log("Error in connecting database")
    console.log(err);
  });
module.exports = app;
