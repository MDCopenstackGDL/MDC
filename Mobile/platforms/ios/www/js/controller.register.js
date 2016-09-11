'use strict';

/* Controllers */

angular.module('GetARide')
  .controller('RegisterCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'RegisterService', function($rootScope, $scope, $location, $localStorage, RegisterService) {
    $rootScope.subheader = "Sign up"
    $scope.signup = function() {
		
      var formData = {
        Email: $scope.email,
        Cellphone: $scope.cellphone
      }

      RegisterService.signup(formData, function(res) {
        if (res.Message == 'User does not exist.') {
			//Not HPE Email
			$localStorage.messageHome = 'Email is not HPE valid, please be sure you are using the right email.';
			$location.path("/home");		  
        } else if(res.Message == 'User already exists') {
			//Duplicated Email
			$localStorage.messageHome = 'The Email is already registered, please be sure you are using the right email.';
			$location.path("/home");	
		} else {
			//Succesful Creation
			//$localStorage.token = res.data.token;
			$localStorage.messageHome = '';
			$location.path("/menu");
        }
		
      }, function() {
		alert(res);
        $rootScope.error = 'Failed to signin';
      })
	  
    };
	
  }]);