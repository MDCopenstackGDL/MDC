'use strict';
/* Controllers */
angular.module('MDC').controller('LoginCtrl', ['$rootScope', '$scope', '$http', '$location', '$localStorage', '$mdToast', 'LoginService', function($rootScope, $scope, $http, $location, $localStorage, $mdToast, LoginService) {
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
        //$localStorage.token = res.data.User[0].idUser;
        //$localStorage.userName = res.data.User[0].Name;
        window.location.href="/";

      } else if (res.data.Message == 'NOT REGISTERED') {
        $mdToast.show(
            $mdToast.simple().textContent("Usuario no registrado.").position('top right')
        );
        $location.path("/signup");
      } else {
        $mdToast.show(
            $mdToast.simple().textContent("Error Message: " + res.data.Message).position('top right')
        );
      }
    }, function(res) {
      $mdToast.show(
            $mdToast.simple().textContent("Something went wrong, please try again.").position('top right')
        );
    }); //closing then
  };
  //$scope.token = $localStorage.token;
  $scope.signUp = function() {
      var url = "/signup/";
      $location.path(url);
    };
}]);