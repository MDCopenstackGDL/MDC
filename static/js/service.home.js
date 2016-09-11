'use strict';

angular.module('MDC').factory('MapsService', ['$http', '$localStorage', 'BASE_URL', function($http, $localStorage, BASE_URL) {
  return {
    consultorios: function(data) {      
      console.log("Consultorios Service call DBG.")
      return $http.get(BASE_URL.urlservices + '/getConsultorios/'
                                            + data.northeast.latitude + '/'
                                            + data.northeast.longitude + '/'
                                            + data.southwest.latitude + '/'
                                            + data.southwest.longitude).then(function(res) {
        return res;
      }, function(res) {
        return res;
      });
    }
  };
}]);