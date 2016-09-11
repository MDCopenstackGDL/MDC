'use strict';

angular.module('GetARide')
  .service('SearchRideService', ['$http', 'BASE_URL', function($http, BASE_URL){

    this.getSites = function() {
        return $http.get(BASE_URL.productionUrl+'/sites').then(function (result) {
            return result.data;
        });
    }

    this.searchRide = function(formData) {
        return $http.get(BASE_URL.productionUrl+'/rides/'+formData.Site+'/'+formData.Stop+'/'+formData.Date+formData.Time+'/'+formData.Going+'/'+formData.Hours).then(function (result) {
            return result.data;
        });
    }

    this.rideRequest = function(rideData){
    	return $http.post(BASE_URL.productionUrl+'/rideRequest',
    		{
    			"idTravel": rideData.Travel,
    			"idUser": rideData.User
			}).then(function (result) {
            	return result.data;
        });
    }

  }]);

 /* return $http({
            method: "post",
            url: BASE_URL.productionUrl+'/rideRequest',
            data: {
                "idTravel": rideData.Travel,
                "idUser": rideData.User
            }   
        }).then(function (result) {
                return result.data;
        });*/