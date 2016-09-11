'use strict';

angular.module('MDC').factory('SignUpService', ['$http', '$localStorage', 'BASE_URL', function($http, $localStorage, BASE_URL) {
  return {
    signUp: function(data) {
      //$httpProvider.defaults.headers.get = { 'My-Header' : 'value' }.
      console.log("SignUp Service call DB.")
      return $http.post(BASE_URL.urlservices + '/registro', data).then(function(res) {
        return res;
      }, function(res) {
        return res;
      });
    }
  };
}]);