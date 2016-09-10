var mysql = require("mysql");

function REST_ROUTER(router, pool, md5) {
  var self = this;
  self.handleRoutes(router, pool, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, pool, md5) {
  
  router.get('/getConsultorios/:nelat/:nelng/:swlat/:swlng', function(req, res) {
    console.log('[SERVICE] - Get consultorios. ');
    var northeastlat = req.params.nelat;
    var northeastlng = req.params.nelng;
    var southwestlat = req.params.swlat;
    var southwestlng = req.params.swlng;
    res.json({
      "Error": false,
      "Message": "OK"      
    });
  });
  
}
  
module.exports = REST_ROUTER;