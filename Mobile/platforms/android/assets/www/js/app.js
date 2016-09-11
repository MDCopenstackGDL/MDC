'use strict';

var app = angular.module('MDC', [
  'ngStorage',
  'ngRoute',
  'ngMaterial',
  'uiGmapgoogle-maps'
]);

app.config(function ($httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyA1j5oGp_wpeu8mbR2lqhVYPE7hBFWM5H0',
        v: '3', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})

app.config(['$routeProvider', '$httpProvider', '$locationProvider', '$mdThemingProvider', function($routeProvider, $httpProvider, $locationProvider, $mdThemingProvider) {

  $routeProvider.
    when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    }).
    when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl'
    }).
    when('/signup', {
      templateUrl: 'partials/signup.html',
      controller: 'SignUpCtrl'
    }).
    when('/history', {
      templateUrl: 'partials/history.html',
      controller: 'HistoryCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
	
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('orange');

  /*
  $mdThemingProvider.definePalette('HPE', {
    '50': '333333', //HPE Black
    '100': 'FFFFFF', // HPE White
    '200': '425563', // Slate
    '300': '80746E', // Bronze
    '400': '5F7A76', // Dark Steel
    '500': '01A982', // HPE Green
    '600': '767676', // Charcoal
    '700': 'CCCCCC', // Grey
    '800': 'F0F0F0', // Silver
    '900': 'F6F6F6', // Cloud
    'A100': '2AD2C9', // Turquoise
    'A200': 'FD9A69', // Orange
    'A400': '614767', // Purple
    'A700': 'FF454F', // Yellow
    'contrastDefaultColor': 'light', // whether, by default, text (contrast)
    // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
      '200', '300', '400', 'A100'
    ],
    'contrastLightColors': undefined // could also specify this if default was 'dark'
  });
  
  $mdThemingProvider.theme('default')
    .primaryPalette('HPE', {
      'default': '500', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '200', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class

    });
  */

}]);