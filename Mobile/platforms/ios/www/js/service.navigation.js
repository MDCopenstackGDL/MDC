'use strict';

angular.module('GetARide')
  .service('NavigationService', ['$http', 'BASE_URL', function($http, BASE_URL){

    this.getMenu = function() {
        return $http.get(BASE_URL.productionUrl+'/menu').then(function (result) {
            return result.data;
        });
    }
  }]);