var mysql = require("mysql");
var session = require('express-session');

function REST_ROUTER(router, pool, md5) {
  var self = this;
  self.handleRoutes(router, pool, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, pool, md5) {
  
  router.use(session({secret: '1234567890SMHH'}));
  var sess;

  router.post('/login', function(req, res) {
    console.log('[SERVICE] - login ');
    var email = req.body.email;
    var pass = req.body.password;
    var query = "SELECT * FROM " +
                "  User u " +
                "WHERE " +
                "  (u.Email = ? " + 
                "AND " +
                "  u.Password = ?) ";
    
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
        
        _session = req.session;
        //In this we are assigning email to _session.userEmail variable. userEmail comes from HTML page.
        _session.userId = result[0].idUser;
        _session.userEmail = result[0].Email;
        res.json({
          "Error": false,
          "Message": "OK",
          "User": result
        });
      })
    });
                
  });

  router.get('/logout', function (req,res) {
      req.session.destroy(function(err) {
        if(err) {
          console.log(err);
        } else {
          res.json({
            "Error": false,
            "Message": "OK",
          });
        }
      });
  });

  router.get('/getCurrentUser', function (req,res) {
      _session = req.session;
      res.json({
          "Error": false,
          "Message": "OK",
          "UserEmail": _session.userEmail
      });
  });
  
}
  
module.exports = REST_ROUTER;