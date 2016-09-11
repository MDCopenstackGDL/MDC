'use strict';

/* Controllers */

angular.module('GetARide')
.controller('NewRideCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'NewRideService', function ($rootScope, $scope, $location, $localStorage, NewRideService) {
      $rootScope.subheader = "New ride"
      NewRideService.getSites().then(function (dataResponse) {
        $scope.sites = dataResponse.Sites;
      });
      
      NewRideService.getMunicipalities().then(function (dataResponse) {
        $scope.municipalities = dataResponse.Municipality;
      });
      
      $scope.initSuburb = function() {
        
      }
      
      $scope.updateSuburbs = function(){
        
        NewRideService.getSuburbs($scope.municipality.idMunicipality).then(function (dataResponse) {
          $scope.suburbs = dataResponse.Menu;
        });
      }

      $scope.saveRideInfo = function () {
        $localStorage.idSite = $scope.idSite;
        $localStorage.datetime = new Date($scope.datetime);
        $localStorage.goingSite = $scope.goingSite;
        $location.path("/recurrence");
      }
      
      $scope.saveStop = function () {
        var formData = {
          idRide: $localStorage.idRide,
          idSuburb: $scope.suburb.idSuburb,
          Description: $scope.description,
          Keywords: []
        }
        
        NewRideService.saveStop(formData).then(function (dataResponse) {
          alert(dataResponse.Message)
          $location.path("/menu");
        });
        
      }
      
      $scope.saveRecurrenceInfo = function () {
        var recurrence;
        var days = { week: []}
        
        if ($scope.recurrence) {
          recurrence = true;
        } else {
          recurrence = false;
        }
        
        if($scope.Monday){
          days.week.push(1);
        }
        
        if($scope.Tuesday){
          days.week.push(2);
        }
        
        if($scope.Wednesday){
          days.week.push(3);
        }
        
        if($scope.Thursday){
          days.week.push(4);
        }
        
        if($scope.Friday){
          days.week.push(5);
        }
        
        var formData = {
          idVehicle: 1,//$localStorage.idVehicle,
          idSite: $localStorage.idSite,
          Recurrence: recurrence,
          GoingSite: $localStorage.goingSite,
          Hour: $localStorage.datetime,
          DaysOfWeek: days.week
        }
        
        NewRideService.newRide(formData).then(function (dataResponse) {
          $localStorage.idRide = dataResponse.idRide;
          $location.path("/newridefilter");
        });
        
      }

    }
  ]);
