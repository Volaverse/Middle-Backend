const info = require('./info');
const buy = require('./buy');
const sell = require('./sell');
const login = require('./login');
const create = require('./createAcc')
const addInfo = require('./addInfo')
const tokenInfo = require('./token')
const getUsername = require('./getUsername');
const addFaucet = require('./faucet');
// module.exports = function(app, db) {  noteRoutes(app, db); info(app ,db)};
// module.exports = function(app, db) {  info(app, db);noteRoutes(app, db);buy(app,db);};
// module.exports = function(app) {  buy(app);info(app);sell(app);login(app)};
module.exports = function(app) {login(app);buy(app);info(app);sell(app);create(app);addInfo(app);getUsername(app);tokenInfo(app);addFaucet(app)};
  // Other route groups could go here, in the future};
