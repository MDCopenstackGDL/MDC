var mysql = require("mysql");

function REST_ROUTER(router, pool, md5) {
  var self = this;
  self.handleRoutes(router, pool, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, pool, md5) {

  router.post('/registro', function(req, res) {
    console.log('[SERVICE] - POST Users.');

    var NAME = req.body.name;
    var EMAIL = req.body.email;
    var PASS = req.body.password;
    var BIRTHDATE = req.body.birthday;
    var CREATEDATE = new Date().toISOString().slice(0, 10);
    var GENDER = req.body.gender;
    var STATUS = 1;
    var FACEBOOKID = 1;
    console.log(NAME);
    var query = 'INSERT INTO mdc.User ' +
                ' (Name, ' +
                'Email, ' +
                'Password, ' +
                'Birthdate, ' +
                'CreateDate, ' +
                'Gender, ' +
                'Status, ' + 
                'FacebookID)' +
                'VALUES ' + 
                '(?,?,?,?,?,?,?,?)'; 
    
    var params = [NAME, EMAIL, PASS, BIRTHDATE, CREATEDATE, GENDER, STATUS, FACEBOOKID];
    var query = mysql.format(query, params);
    console.log(query);
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