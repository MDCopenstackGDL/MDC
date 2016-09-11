'use strict';

/* Controllers */

angular.module('GetARide')
  .controller('SearchRideCtrl', ['$scope', 'SearchRideService', function( $scope, SearchRideService) {
    $rootScope.subheader = "Search a ride"
    SearchRideService.getSites().then(function(dataResponse){
      $scope.sites = dataResponse;
    });

  $scope.SearchRideInfo = function(Site, Stop, Date, Time, Going, Hours) {
    var go = 1;
    var day = String(Date.getDate());
    var month = String(Date.getMonth() + 1);
    var year = String(Date.getFullYear());
    var customDate = year.concat(month, day);
    var hour = String(Time.getHours());
    var min = String(Time.getMinutes());
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (min < 10) {
      min = '0' + min;
    }
    var customTime = hour.concat(min, '00');
    if(Going){
      go = 1;
    }else{
      go = 0;
    }
    var formData = {
      Site: Site,
      Stop: Stop,
      Date: customDate,
      Time: customTime,
      Going: go,
      Hours: Hours     
    };
    SearchRideService.searchRide(formData).then(function(dataResponse){
      $scope.results = dataResponse;
    });
  }

  $scope.request = function(result){    
      var rideData = {
        Travel: result.idTravel,
        User: 3
      };
      SearchRideService.rideRequest(rideData).then(function(dataResponse){
        $scope.ride = dataResponse;
      });
  }

}]);