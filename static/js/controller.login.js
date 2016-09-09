'use strict';
/* Controllers */
angular.module('MDC').controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'LoginService', function($rootScope, $scope, $location, $localStorage, LoginService) {
  var data;
  $scope.login = function() {
    var formData = {
      email: $scope.email,
      password: $scope.password
    }
    data = LoginService.login(formData).then(function(res) {
      //Validate Access
      console.log("Mensaje: " + res.data.Message);
      if (res.data.Message == 'OK') {
        //User and Password OK. Set session and move
        $localStorage.messageHome = '';
        $localStorage.token = res.data.User[0].idUser;
        $scope.result = res;
        $location.path("/menu");
      } else if (res.data.Message == 'User not registered') {
        alert('You are not registered on the system. Please sign up.');
        $location.path("/register");
      } else {
        alert(res.data.Message);
      }
    }, function(res) {
      $localStorage.messageHome = 'Something went wrong, please try again. 2';
      $location.path("/home");
    }); //closing then
  };
  $scope.token = $localStorage.token;
}]);