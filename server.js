const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const cors =require('cors');
const app = express();
const port = 8000;
const morgan = require('morgan');
app.use(cors())
app.use(morgan('tiny'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


require('./app/routes')(app);

mongoose
  .connect(
    // eslint-disable-next-line no-undef
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,useUnifiedTopology: true 
    }
  )
  .then(() => {
    app.listen(port, function () {
        console.log('We are live on ' + port);
    });
  })
  .catch((err) => {
    console.log("Error in connecting database")
    console.log(err);
  });