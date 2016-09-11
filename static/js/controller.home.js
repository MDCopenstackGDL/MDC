'use strict';

/* Controllers */

angular.module('MDC')
  .controller('HomeCtrl', ['$scope', '$http', '$location', '$localStorage', '$mdSidenav', '$mdDialog', 'MapsService', 'LoginService', function($scope, $http, $location, $localStorage, $mdSidenav, $mdDialog, MapsService, LoginService) {	
    
    var pins = 'consultorios';
    
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
      
    $scope.reloadMap = function(type){
      pins = type;
      $scope.markers = [];
      var markers = [];
      markers.push(createUserMarker('u1', $scope.map.bounds));
      populateMarkers(markers);
    }

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
    
    $scope.onClick = function(marker, eventName, model) {
      console.log("Clicked!" + marker.key);   
      if(marker.key != 'u1'){
        var title;
        if(pins = 'consultorios'){
          title = 'Consultorio';
        } else {
          title = 'Farmacia';
        }
        
        var serviceData = { userId: marker.key};
        
        MapsService.userInfo(serviceData).then(function(res){
          console.log("Mensaje: " + res.data.Message);
          if (res.data.Message == 'OK') {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#map_canvas')))
                .clickOutsideToClose(true)
                .title(title)
                .textContent( 'Nombre: ' + res.data.Results[0].Name + ', ' +
                              'Correo: ' + res.data.Results[0].Email)
                .ariaLabel('Informacion')
                .ok('Entendido')
                .targetEvent(eventName)
            );
          } 
        }, function(res){
                
        });

      }
    };
    
    $scope.markers = [];
    // Get the bounds from the map once it's loaded
    $scope.$watch(function() {
      return $scope.map.bounds;
    }, function(nv, ov) {
      // Only need to regenerate once
      if (!ov.southwest && nv.southwest) {
        // Marker for user
        var markers = [];
        markers.push(createUserMarker('u1', $scope.map.bounds));
        populateMarkers(markers)
        
      }
    }, true);
    
    
    function populateMarkers(markers){
      var serviceData = {
        northeast : $scope.map.bounds.northeast,
        southwest : $scope.map.bounds.southwest
      };
      if(pins == 'consultorios'){
        MapsService.consultorios(serviceData).then(function(res){
          console.log("Mensaje: " + res.data.Message);
          if (res.data.Message == 'OK') {
            for(var x in res.data.Results){
              markers.push(createMarker(res.data.Results[x],res.data.Results[x].idUser,$scope.map.bounds));
            }
          } 
        }, function(res){
                
        });
      } else {
        MapsService.farmacias(serviceData).then(function(res){
          console.log("Mensaje: " + res.data.Message);
          if (res.data.Message == 'OK') {
            for(var x in res.data.Results){
              markers.push(createMarker(res.data.Results[x],res.data.Results[x].idUser,$scope.map.bounds));
            }
          } 
        }, function(res){
                
        });
      }
      $scope.markers = markers;
    }
    
    var createUserMarker = function(i, bounds, idKey) {

      if (idKey == null) {
        idKey = "id";
      }

      var latitude = pos.lat;
      var longitude = pos.lng;
      var ret = {
        latitude: latitude,
        longitude: longitude,
        title: 'Tu estás aquí',
        show: true,
        icon: 'https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png'
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
      var iconPath;
      if(pins == 'consultorios'){
        iconPath = 'img/consultorioPin.png';
      } else {
        iconPath = 'img/farmaciaPin.png';
      }
      var ret = {
        latitude: latitude,
        longitude: longitude,
        title: position.Name,
        show: true,
        icon: iconPath
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
      //$localStorage.token = null;
      //var url = "/home";
      //$location.path(url);
      var data = LoginService.logout().then(function(res) {
        window.location.href="/";
      }, function(res) {
        console.log(res);
      });
    };
    
    $scope.goHistory = function() {
      var url = "/#/history";
      window.location.href=url;
    };
    // -----------------------------------------------
    // Logged User
    // -----------------------------------------------

    $scope.isLoggedUser = false;
    $scope.currentUser = { email: '' };

    var data = LoginService.getCurrentUser().then(function(res) {
        $scope.isLoggedUser = res.data.UserEmail != null && res.data.UserEmail != undefined && res.data.UserEmail != '';
        $scope.currentUser.email = res.data.UserEmail;
    }, function(res) {
        console.log(res);
    });

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