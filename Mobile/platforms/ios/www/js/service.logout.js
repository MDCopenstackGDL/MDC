'use strict';

angular.module('GetARide')
  .factory('LogoutService', ['$http', '$localStorage', 'BASE_URL', function($http, $localStorage, BASE_URL){
    
    function changeUser(user) {
      angular.extend(currentUser, user);
    }
    
    function urlBase64Decode(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += '==';
          break;
        case 3:
          output += '=';
          break;
        default:
          throw 'Illegal base64url string!';
      }
      return window.atob(output);
    }   
    
    function getUserFromToken() {
      var token = $localStorage.token;
      var user = {};
      if (typeof token !== 'undefined') {
        //user = JSON.parse(urlBase64Decode(token));
      }
      return user;
    }
    
    var currentUser = getUserFromToken();
    
    return{
      logout: function(success) {
        changeUser({});
        delete $localStorage.token;
        success();
      }
    };
    
  }]);