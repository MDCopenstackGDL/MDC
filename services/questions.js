var mysql = require("mysql");

function REST_ROUTER(router, pool, md5) {
  var self = this;
  self.handleRoutes(router, pool, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, pool, md5) {
  router.get('/getHistory', function(req, res) {
    _session = req.session;
    var query = " SELECT Q.idQuestion, Q.Question AS 'question', A.idAnswer, A.Answer AS 'answer' " +
                " FROM Question AS Q " +
                " LEFT JOIN ( " +
                "   SELECT ANS.* " +
                  " FROM Answer AS ANS " +
                  " INNER JOIN MedicalHistory AS M " +
                  " ON ANS.idMedicalHistory = M.idMedicalHistory " +
                  " WHERE (M.idUser = ?) " +
                " ) AS A " +
                " ON Q.idQuestion = A.idQuestion " +
                " ORDER BY Q.idQuestion";
    var user = [_session.userId];
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
          "answers": result,
          "comments": ""
        });
      })
    });
                
  });
}
  
module.exports = REST_ROUTER;