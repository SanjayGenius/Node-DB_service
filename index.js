var express = require("express");
const port = 8096
require('./sqlconfig/config.js');
var app = express();
var authMethods=require("./services/authservice.js");
var dashboardMethods=require("./services/dashboardservice.js");
var userManagementMethods=require("./services/usermanagementservice.js");
var authRoutes=require("./routes/auth.js")(express.Router(),app,authMethods);
var usermanagementRoutes=require("./routes/usermanagement.js")(express.Router(),userManagementMethods);
var dashboardroutes=require("./routes/dashboard.js")(express.Router(),app,dashboardMethods);
//require('./eurekahelper/eureka-helper').registerWithEureka('db-service', port);
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST,DELETE,PUT");
    next();
  });
  app.use('/auth', authRoutes);
  app.use('/usermanagement', usermanagementRoutes);
  app.use('/dashboard', dashboardroutes);
 // var routes = require("./routes/routes.js")(app);
  var server = app.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
})