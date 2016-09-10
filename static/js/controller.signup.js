'use strict';
/* Controllers */
angular.module('MDC')
  .controller('SignUpCtrl', ['$scope', '$location', '$localStorage', 'SignUpService', function($scope, $location, $localStorage, SignUpService) {
    
    $scope.user = {
      name: '',
      email: '',
      password: '',
      birthday: '',
      isDoctor: false,
      cedula: ''
    };

    $scope.signUp = function() {
      var data= SignUpService.signUp($scope.user).then(function(res) {
        //Validate Access
        console.log("Llamando al service");
        if (res.error) {
          console.log("Mensaje: " + res.errorMessage);
        } else {
          console.log("Mensaje: " + res.error);
        }
      }); //closing then
    };

}]);