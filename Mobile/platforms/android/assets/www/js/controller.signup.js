'use strict';
/* Controllers */
angular.module('MDC')
  .controller('SignUpCtrl', ['$scope', '$location', '$localStorage', '$mdToast', 'SignUpService', function($scope, $location, $localStorage, $mdToast, SignUpService) {
    
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
        }
      }); //closing then
      
    };

}]);