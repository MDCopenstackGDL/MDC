'use strict';

/* Controllers */

angular.module('MDC')
  .controller('HomeCtrl', ['$scope', '$location', '$localStorage', '$mdSidenav', 'MapsService', function($scope, $location, $localStorage, $mdSidenav, MapsService) {	
	
    $scope.changeView = function(view){
      $location.path(view); 
    }
    
    $scope.markers = [];
    var pos = [];
    
    $scope.map = { 
        center: { 
          latitude: 45, 
          longitude: -73 
        }, 
        zoom: 8,
        bounds: {}
      };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.$apply(function(){
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          $scope.map = { 
              center: { 
                  latitude: pos.lat, 
                  longitude: pos.lng 
              },
              zoom: 15,
              bounds: {}
          };
        });
      }, function() {
        //handleLocationError(true, infoWindow, pos);
      });
    } else {
      // Browser doesn't support Geolocation
    }
    
    $scope.markers = [];
    // Get the bounds from the map once it's loaded
    $scope.$watch(function() {
      return $scope.map.bounds;
    }, function(nv, ov) {
      // Only need to regenerate once
      if (!ov.southwest && nv.southwest) {
        var markers = [];
        // Marker for user
        markers.push(createUserMarker(0, $scope.map.bounds));
        var serviceData = {
          northeast : $scope.map.bounds.northeast,
          southwest : $scope.map.bounds.southwest
        };
        MapsService.consultorios(serviceData).then(function(res){
          console.log("Mensaje: " + res.data.Message);
          if (res.data.Message == 'OK') {
            for(var x in res.data.Results){
              markers.push(createMarker(res.data.Results[x],x,$scope.map.bounds));
            }
          } 
        }, function(res){
              
        })
        $scope.markers = markers;
      }
    }, true);
    
    var createUserMarker = function(i, bounds, idKey) {

      if (idKey == null) {
        idKey = "id";
      }

      var latitude = pos.lat;
      var longitude = pos.lng;
      var ret = {
        latitude: latitude,
        longitude: longitude,
        title: 'm' + i
      };
      ret[idKey] = i;
      return ret;
    };
    
    var createMarker = function(position, i, bounds, idKey) {

      if (idKey == null) {
        idKey = "id";
      }

      var latitude = position.Latitude;
      var longitude = position.Longitude;
      var ret = {
        latitude: latitude,
        longitude: longitude,
        title: position.Name
      };
      
      ret[idKey] = i;
      return ret;
      
    };
  
    $scope.login = function() {
      var url = "/login/";
      $location.path(url);
    };

    $scope.signUp = function() {
      var url = "/signup/";
      $location.path(url);
    };

    $scope.signOut = function() {
      $localStorage.token = null;
      var url = "/home";
      $location.path(url);
    };
  
    // -----------------------------------------------
    // Logged User
    // -----------------------------------------------

    $scope.isLoggedUser = $localStorage.token != null && $localStorage.token != undefined;
    $scope.userName = $localStorage.userName; 

    $scope.goHome = function(){
      var url = "/";
      $location.path(url);
    };

    $scope.toggleLeft = buildToggler('left');
    $scope.isOpenLeft = function(){
      return $mdSidenav('left').isOpen();
    };

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            console.log("toggle " + navID + " is done");
          });
      }
    }

  }]);