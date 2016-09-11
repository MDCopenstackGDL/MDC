'use strict';

angular.module('MDC').factory('LoginService', ['$http', '$localStorage', 'BASE_URL', function($http, $localStorage, BASE_URL) {
  return {
    login: function(data) {
      //$httpProvider.defaults.headers.get = { 'My-Header' : 'value' }.
      console.log("Login Service call DBG.")
      //var encodedString =  btoa(data.email + ':' + data.password);
      //$http.defaults.headers.common['authorization'] = 'Basic ' + encodedString;
      return $http.post(BASE_URL.urlservices + '/login', data).then(function(res) {
        return res;
      }, function(res) {
        return res;
      });
    }
  };
}]);