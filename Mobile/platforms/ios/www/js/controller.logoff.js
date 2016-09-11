'use strict';

/* Controllers */

angular.module('GetARide')
    .controller('LogOffCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'LogoutService', function($rootScope, $scope, $location, $localStorage, LogoutService) {
    
    $localStorage.token = null;
 
  }]);