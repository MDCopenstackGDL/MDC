var mysql = require("mysql");

function REST_ROUTER(router, pool, md5) {
  var self = this;
  self.handleRoutes(router, pool, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, pool, md5) {
  
  router.post('/login', function(req, res) {
    console.log('[SERVICE] - login ');
    var email = req.body.email;
    var pass = req.body.pass;
    var query = "SELECT * FROM " +
                "  User u " +
                "WHERE " +
                "  (u.Email = ? " + 
                "AND " +
                "  u.Password >= ?) ";
    
    var user = [email, pass];
    var query = mysql.format(query, user);
    
    pool.getConnection(function(err, connection){
      if(err) {
        console.error(err);
        res.statusCode = 500;
        res.json({
          "Error": true,
          "Message": "DB connection error. " + err
        });
        return;
      }
      connection.query(query, function(err, result){
        connection.release();
        if(err) {
          console.error(err);
          res.statusCode = 500;
          res.json({
            "Error": true,
            "Message": "DB connection error. " + err
          });
          return
        }
        console.log("Query execution successful.");
        res.json({
          "Error": false,
          "Message": "OK",
          "Results": result
        });
      })
    });
                
  });
  
}
  
module.exports = REST_ROUTER;