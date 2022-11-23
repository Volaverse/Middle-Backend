const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require("mongoose");
const dotenv = require('dotenv').config();

const app = express();
const port = 8000;
const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getTime();
    console.log(method, url, time);
    next();
}
const morgan = require('morgan');
app.use(morgan('tiny'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


require('./app/routes')(app);

mongoose
  .connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,useUnifiedTopology: true 
    }
  )
  .then(() => {
    app.listen(port, function (req, res) {
        console.log('We are live on ' + port);
    });
  })
  .catch((err) => {
    console.log("Error in connecting database")
    console.log(err);
  });