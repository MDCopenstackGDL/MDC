'use strict';

angular.module('GetARide')
.factory('LoginService', ['$http', '$localStorage', 'BASE_URL', function ($http, $localStorage, BASE_URL) {
      return {
        login : function (data) {
          //$httpProvider.defaults.headers.get = { 'My-Header' : 'value' }.

          var encodedString =  btoa(data.email + ':' + data.password);
          $http.defaults.headers.common['authorization'] = 'Basic ' + encodedString;
          return $http.get(BASE_URL.productionUrl + '/user/login').then(function (res) {
            /*if (typeof res.data ==='object'){
            return res.data;
            }
            else {
            return $q.reject(res.data);
            }*/
            return res;
          },
            function (res) {
            return res;
          });
        }
      };

    }
  ]);
