'use strict';

angular.module('MDC').factory('HistoryService', ['$http', '$localStorage', 'BASE_URL', function($http, $localStorage, BASE_URL) {
  return {
    setHistory: function(data) {
      //$httpProvider.defaults.headers.get = { 'My-Header' : 'value' }.
      console.log("setHistory Service call DB.")
      return $http.post(BASE_URL.urlservices + '/setHistory', data).then(function(res) {
        return res;
      }, function(res) {
        return res;
      });
    },
    getHistory: function(data) {
      //$httpProvider.defaults.headers.get = { 'My-Header' : 'value' }.
      console.log("getHistory Service call DB.")
      return $http.get(BASE_URL.urlservices + '/getHistory', data).then(function(res) {
        return res;
      }, function(res) {
        return res;
      });
    }
  };
}]);