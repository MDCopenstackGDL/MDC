'use strict';

angular.module('GetARide')
  .factory('LoginService', ['$http', '$localStorage', 'BASE_URL', function($http, $localStorage, BASE_URL){

    return {
      login: function(data, success, error) {
        $http.get(BASE_URL.productionUrl + '/login/' + data.email + '/' + data.password).success(success).error(error)
      }
    };
    
  }])
  
  .factory('MyInformationService', ['$http', '$localStorage', 'BASE_URL', function($http, $localStorage, BASE_URL){

    return {
      vehicleInformation: function(data, success, error) {
        $http.get(BASE_URL.productionUrl + '/car/' + data.IdUser).success(success).error(error)
      },
      updateVehicle: function(data, success, error){
        $http.post(BASE_URL.productionUrl + '/myinfo', data).success(success).error(error)
      }
    };
    
  }])
  
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
    
  }])
  
  .factory('RegisterService', ['$http', '$localStorage', 'BASE_URL', function($http, $localStorage, BASE_URL){

    return {
      signup: function(data, success, error) {
        //$http.get(BASE_URL.productionUrl + '/login/' + data.email + '/' + data.password).success(success).error(error)
        $http.post(BASE_URL.productionUrl + '/register', data).success(success).error(error)
      }
    };
    
  }])
  ;