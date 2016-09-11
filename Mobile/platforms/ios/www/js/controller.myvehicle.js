'use strict';

/* Controllers */

angular.module('GetARide')
  .controller('MyVehicleCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'MyInfoService', function($rootScope, $scope, $location, $localStorage, MyInfoService) {
	if ($localStorage.idVehicle){
    	MyInfoService.getvehicle($localStorage.idVehicle).then(function(vehicle){
			
			$scope.car =vehicle;
		});
	}
		
	$scope.addvehicle = function (){
		var formData = {
		 idUser: $localStorage.token,
		 Brand: $scope.car.Brand,
         Subbrand: $scope.car.Subbrand,
         Model: $scope.car.Model,
         Plates: $scope.car.Plates,
         AvailableSeats: $scope.car.AvailableSeats,
		 Description: $scope.car.Description
		}
		
		MyInfoService.addnewcar(formData).then (function(result){
		if (result.data.Error=== false){
			alert(result.data.Message); 
			$location.path('my_info'); 
		}else{
			alert ('Could not add new car');
		}
		});
			
	};
	
    $scope.updateVehicleInformation = function() {
       var formData = {
        idVehicle: $localStorage.idVehicle,
		Brand: $scope.car.Brand,
        Subbrand: $scope.car.Subbrand,
        Model: $scope.car.Model,
        Plates: $scope.car.Plates,
        AvailableSeats: $scope.car.AvailableSeats,
		Description: $scope.car.Description
      } 

      MyInfoService.updateCarInfo(formData).then(function(result){
		alert(result);
	 });
	};
    
    
  }]);