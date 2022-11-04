const express        = require('express');
const bodyParser     = require('body-parser');

const app            = express();
const port =8000;
const logger =(req,res,next) =>{
    const method = req.method;
    const url = req.url;
    const time = new Date().getTime();
    console.log(method,url,time);
    next();
}
const morgan = require('morgan');
app.use(morgan('tiny'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


require('./app/routes')(app);
app.listen(port, () => {  console.log('We are live on ' + port);});

