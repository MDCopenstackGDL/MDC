'use strict';

/* Controllers */

angular.module('GetARide')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'LoginService', function($rootScope, $scope, $location, $localStorage, LoginService) {

    $scope.login = function() {
      var formData = {
        email: $scope.email,
        password: $scope.password
      }

      LoginService.login(formData, function(res) {
        if (res.idUser == '') {
          alert(res.data)
        } else {
          $localStorage.token = res.idUser;
          $localStorage.idVehicle = res.Vehicle[0].idVehicle;
          $location.path("/menu"); 
        }
      }, function() {
        window.location = "/login";  
        $rootScope.error = 'Failed to login';
      })
    };
    
    $scope.token = $localStorage.token;
    
  }])
  
  .controller('LogoutCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'LogoutService', function($rootScope, $scope, $location, $localStorage, LogoutService) {
    
    $scope.logout = function() {
      LogoutService.logout(function() {
        window.location = "/"
      }, function() {
        alert("Failed to logout!");
      });
    };
    
    $scope.token = $localStorage.token;
 
  }])
  
  .controller('RegisterCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'RegisterService', function($rootScope, $scope, $location, $localStorage, RegisterService) {
    
    $scope.signup = function() {
      var formData = {
        Email: $scope.email,
        Cellphone: $scope.cellphone
      }

      RegisterService.signup(formData, function(res) {
        if (res == 'User doesn\'t exist in Active Directory') {
          alert(res)    
        } else {
          //$localStorage.token = res.data.token;
          $location.path("/menu");
        }
      }, function() {
        $rootScope.error = 'Failed to signin';
      })
    };
  }])
  
  .controller('MyInformationCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'MyInformationService', function($rootScope, $scope, $location, $localStorage, MyInformationService) {
    
    $scope.changeView = function(view){
      $location.path(view); 
    }
    
    $scope.updateVehicleInformation = function() {
      var formData = {
        Brand: $scope.Brand,
        SubBrand: $scope.SubBrand,
        Model: $scope.Model,
        Plates: $scope.Plate,
        idUser: $localStorage.token
      }

      MyInformationService.updateVehicle(formData, function(res) {
        if (res != undefined) {
          alert(res)
        } else {
          
        }
      }, function() {
        
      })
    };
    
    
  }])
  
  .controller('NavigationCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.changeView = function(view){
      $location.path(view); 
    }
  }]);
