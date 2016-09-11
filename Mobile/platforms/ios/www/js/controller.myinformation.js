'use strict';

/* Controllers */

angular.module('GetARide')
  .controller('MyInfoCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'MyInfoService', function($rootScope, $scope, $location, $localStorage, MyInfoService) {
	
  var originatorEv;
  
  $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
  
  $rootScope.subheader = "My information"
	 $scope.status = {
    isFirstOpen: true,
    oneAtATime: true,
    isItemOpen: [true]
  };

	 MyInfoService.getgarage().then(function(dataresponse){
		$scope.vehicles = dataresponse.Vehicles;
	}); 
	
	 MyInfoService.getinfo().then(function(dataresponse){
		$scope.name = dataresponse.Name;
		$scope.email = dataresponse.Email;
		$scope.phone = dataresponse.Cellphone;

	}); 
	
	
    $scope.changeView = function(view){
      $location.path(view); 
    }
    /* $scope.vehicles = [
    {
      "idVehicle": 1,
      "Brand": "nissan",
      "Subbrand": "versa",
      "Model": "2015",
      "InUse": "true"
    },
    {
      "idVehicle": 4,
      "Brand": "nissan",
      "Subbrand": "versa",
      "Model": "2015",
      "InUse": "true"
    }
  ]; */
	
	
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
	
	
    
  }]);
  
  