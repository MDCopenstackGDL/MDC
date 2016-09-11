'use strict';

angular.module('GetARide')
  .factory('RegisterService', ['$http', '$localStorage', 'BASE_URL', function($http, $localStorage, BASE_URL){

    return {
      signup: function(data, success, error) {
        $http.post(BASE_URL.productionUrl + '/user/register', data).success(success).error(error)
      }
    };
    
  }]);