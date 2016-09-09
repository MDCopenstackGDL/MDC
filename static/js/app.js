'use strict';

var app = angular.module('MDC', [
    'ngStorage',
    'ngRoute',
	'ui.bootstrap',
	'xeditable'
]);

app.config(function ($httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.config(['$routeProvider', '$httpProvider', '$locationProvider', function ($routeProvider, $httpProvider, $locationProvider) {

  $routeProvider.
    when('/', {
      templateUrl: 'partials/home.html',
      controller: 'NavigationCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
	

}]);