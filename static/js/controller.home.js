'use strict';

/* Controllers */

angular.module('MDC')
  .controller('HomeCtrl', ['$scope', '$location', '$localStorage', function($scope, $location, $localStorage) {	
	
    $scope.changeView = function(view){
      $location.path(view); 
    }
    
    $scope.map = { 
        center: { 
          latitude: 45, 
          longitude: -73 
        }, 
        zoom: 8};

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        $scope.map = { 
            center: { 
                latitude: pos.lat, 
                longitude: pos.lng 
            },
            zoom: 15,
            marker: {
                  id:0,
                  coords: {
                      latitude: pos.lat,
                      longitude: pos.lng
                  },
                  options: {
                      icon: {
                          anchor: new google.maps.Point(36,36),
                          origin: new google.maps.Point(0,0),
                          scaledSize: new google.maps.Size(72,72),
                          url: 'img/cluster1.png'
                      }
                  }
            }
        };
        
      }, function() {
        handleLocationError(true, infoWindow, pos);
      });
    } else {
      // Browser doesn't support Geolocation
    }
  
  
  
  }]);