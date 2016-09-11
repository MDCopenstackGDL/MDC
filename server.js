var config = require('./config');
var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var md5 = require('MD5');
var app = express();
var morgan = require('morgan');
var consultorio = require('./services/consultorio.js');
var registro = require('./services/registro.js');
var farmacia = require('./services/farmacia.js');
var login = require('./services/login.js');
var questions = require('./services/questions.js');
var listen_port = process.env.PORT || 3000;
var dev = process.env.DEV;

function REST() {
  var self = this;
  self.connectMysql();
};
REST.prototype.connectMysql = function() {
  var self = this;
  var pool = mysql.createPool({
    host: config.db.host,
    port: config.db.portdb,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  });
  
  self.configureExpress(pool);
}
REST.prototype.configureExpress = function(pool) {
  var self = this;
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  var router = express.Router();
  router.use(function(req, res, next) {
    console.log('There was a call on the API.');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    next();
  });
  app.use('/api', router);
  app.use(morgan("dev"));
  app.use(express.static("./static"));
  var consultorio_router = new consultorio(router, pool, md5);
  var registro_router = new registro(router, pool, md5);
  var login_router = new login(router, pool, md5);
  var farmacia_router = new farmacia(router, pool, md5);
  var questions_router = new questions(router, pool, md5);
  self.startServer();
}
REST.prototype.startServer = function() {
  app.listen(listen_port, function() {
    console.log("All right ! I am alive at Port " + listen_port + ".");
  });
}
REST.prototype.stop = function(err) {
  console.log("ISSUE WITH MYSQL \n" + err);
  process.exit(1);
}
new REST();
//Export app for unit testing
module.exports = app;