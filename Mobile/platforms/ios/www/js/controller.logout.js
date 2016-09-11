'use strict';

/* Controllers */

angular.module('GetARide')
    .controller('LogoutCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'LogoutService', function($rootScope, $scope, $location, $localStorage, LogoutService) {
    
    $scope.logout = function() {
      LogoutService.logout(function() {
        window.location = "/"
      }, function() {
        alert("Failed to logout!");
      });
    };
    
    $scope.token = $localStorage.token;
 
  }]);