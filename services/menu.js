var mysql = require("mysql");

function REST_ROUTER(router, pool, md5) {
  var self = this;
  self.handleRoutes(router, pool, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, pool, md5) {
  
  //-------------------MENU SERVICES-----------------------------------------
  router.get("/menu", function(req, res) {
    console.log("[SERVICE] - Get all options available for the menu.");
    var query = "SELECT * \n" + "FROM \n" + "    menuoption \n" + "ORDER BY \n" + "    `OptionOrder` ";
    query = mysql.format(query);
    pool.getConnection(function(err, connection) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.json({
          "Error": true,
          "Message": "DB connection refused. " + err
        });
        return;
      }
      connection.query(query, function(err, rows) {
        connection.release();
        console.log(query);
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.json({
            "Error": true,
            "Message": err
          });
        } else {
          console.log("Query execution successful.");
          res.json({
            "Error": false,
            "Message": "OK",
            "Menu": rows
          });
        }
      });
    });
  });
  //-------------------END OF SERVICES-----------------------------------------
}

module.exports = REST_ROUTER;