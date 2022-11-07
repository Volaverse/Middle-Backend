const info = require('./info');
const buy = require('./buy');
const sell = require('./sell');
// module.exports = function(app, db) {  noteRoutes(app, db); info(app ,db)};
// module.exports = function(app, db) {  info(app, db);noteRoutes(app, db);buy(app,db);};
module.exports = function(app) {  buy(app);info(app);sell(app)};
  // Other route groups could go here, in the future};
