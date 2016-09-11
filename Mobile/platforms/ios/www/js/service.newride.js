'use strict';

angular.module('GetARide')
  .service('NewRideService', ['$http', '$localStorage', 'BASE_URL', function($http, $localStorage, BASE_URL){

    this.getSites = function() {
      return $http.get(BASE_URL.productionUrl+'/sites').then(function(result){
        return result.data;
      });
    }
    
    this.getMunicipalities = function() {
      return $http.get(BASE_URL.productionUrl+'/cat/municipality').then(function(result){
        return result.data;
      });
    }
    
    this.getSuburbs = function(municipality) {
      return $http.get(BASE_URL.productionUrl+'/cat/suburbs/' + municipality).then(function(result){
        return result.data;
      });
    }
    
    this.newRide = function(data) {
      return $http.post(BASE_URL.productionUrl + '/ride', data).then(function(result){
        return result.data;
      });
    }
    
    this.saveStop = function(data) {
      return $http.post(BASE_URL.productionUrl + '/stop', data).then(function(result){
        return result.data;
      });
    }
    
  }]);