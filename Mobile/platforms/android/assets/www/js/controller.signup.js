'use strict';
/* Controllers */
angular.module('MDC')
  .controller('SignUpCtrl', ['$scope', '$location', '$localStorage', '$mdToast', 'SignUpService', 'LoginService', function($scope, $location, $localStorage, $mdToast, SignUpService, LoginService) {
    
    $scope.user = {
      name: '',
      email: '',
      password: '',
      birthday: null,
      gender: '',
      isDoctor: false,
      cedula: ''
    };

    $scope.signUp = function() {
        
      
      var data= SignUpService.signUp($scope.user).then(function(res) {
        //Validate Access
        if (res.data.Error) {
          console.log("Error Message: " + res.data.Message);
          $mdToast.show(
            $mdToast.simple().textContent("Error Message: " + res.data.Message).position('top right')
          );
        } else {

          console.log("User was saved.");
          $mdToast.show(
            $mdToast.simple().textContent("Registro Exitoso!").position('top right')
          );
          // Login new user -----------------------
          var formData = {
            email: $scope.user.email,
            password: $scope.user.password
          }
          data = LoginService.login(formData).then(function(res) {
            //Validate Access
            if (res.data.Message == 'OK') {
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
          // --------------------------------------
          
        }
      }); //closing then
      
    };

}]);