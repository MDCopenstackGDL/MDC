'use strict';

/* Controllers */

angular.module('MDC')
  .controller('HomeCtrl', ['$scope', '$location', '$localStorage', '$mdSidenav', function($scope, $location, $localStorage, $mdSidenav) {	
	
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
        
         $scope.markers = [];
        // Get the bounds from the map once it's loaded
        $scope.$watch(function() {
          return $scope.map.bounds;
        }, function(nv, ov) {
          // Only need to regenerate once
          if (!ov.southwest && nv.southwest) {
            var markers = [];
            markers.push(createRandomMarker(1, $scope.map.bounds))
            $scope.markers = markers;
          }
        }, true);
        
      }, function() {
        //handleLocationError(true, infoWindow, pos);
      });
    } else {
      // Browser doesn't support Geolocation
    }
    
    var createRandomMarker = function(i, bounds, idKey) {
      var lat_min = bounds.southwest.latitude,
      lat_range = bounds.northeast.latitude - lat_min,
      lng_min = bounds.southwest.longitude,
      lng_range = bounds.northeast.longitude - lng_min;

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