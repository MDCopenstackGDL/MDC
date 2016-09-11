var mysql = require("mysql");

function REST_ROUTER(router, pool, md5) {
  var self = this;
  self.handleRoutes(router, pool, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, pool, md5) {
  
  router.post('/saveMedicalHistory/:nelat/:nelng/:swlat/:swlng', function(req, res) {
    console.log('[SERVICE] - Save Medical History. ');
    var answers = req.body.answers;
    var comments = req.body.comments;
    var query = 'INSERT INTO mdc.MedicalHistory ' +
                '  Location loc ' +
                'JOIN ' +
                '  User us ' +
                'ON ' +
                '  us.idUser = loc.idUser ' +
                'WHERE ' +
                '  (loc.Latitude <= ? ' + //north
                'AND ' +
                '  loc.Latitude >= ?) ' + //south
                'AND ' +
                '  (loc.Longitude <= ? ' + //north
                'AND ' +
                '  loc.Longitude >= ?)'; //south
    
    var coords = [northeastlat, southwestlat, northeastlng, southwestlng];
    var query = mysql.format(query, coords);
    
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