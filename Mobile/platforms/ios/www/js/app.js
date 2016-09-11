'use strict';

angular.module('GetARide', [
    'ngStorage',
    'ngRoute',
    'ngMaterial'
])

.config(['$routeProvider', '$httpProvider', '$locationProvider', '$mdThemingProvider', function ($routeProvider, $httpProvider, $locationProvider, $mdThemingProvider) {

  $routeProvider.
    when('/', {
      templateUrl: 'partials/home.html',
      controller: 'NavigationCtrl'
    }).
    when('/menu', {
      templateUrl: 'partials/menu.html',
      controller: 'NavigationCtrl'
    }).
    when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl'
    }).
    when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'RegisterCtrl'
    }).
	when('/my_info', {
      templateUrl: 'partials/myinformation.html',
      controller: 'MyInfoCtrl'
    }).
	when('/myinfoedit', {
      templateUrl: 'partials/myinfoedit.html',
      controller: 'MyInfoCtrl'
    }).
    when('/myvehicle', {
      templateUrl: 'partials/myvehicle.html',
      controller: 'MyVehicleCtrl'
    }).
    when('/myvehicleedit', {
      templateUrl: 'partials/myvehicleedit.html',
      controller: 'MyVehicleCtrl'
    }).
    when('/myrideweek', {
      templateUrl: 'partials/myrideweek.html',
      controller: 'MyRideWeekCtrl'
    }).
    when('/mypassweek', {
      templateUrl: 'partials/mypassweek.html',
      controller: 'MyPassWeekCtrl'
    }).
    when('/newridefilter', {
      templateUrl: 'partials/newridefilter.html',
      controller: 'NewRideCtrl'
    }).
    when('/newride', {
      templateUrl: 'partials/newride.html',
      controller: 'NewRideCtrl'
    }).
    when('/recurrence', {
      templateUrl: 'partials/recurrence.html',
      controller: 'NewRideCtrl'
    }).
    when('/searchride', {
      templateUrl: 'partials/searchride.html',
      controller: 'SearchRideCtrl'
    }).
    when('/termsandconditions', {
      templateUrl: 'partials/termsandconditions.html'
    }).
    otherwise({
      redirectTo: '/'
    });
    

  $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
    return {
      'request': function (config) {
        config.headers = config.headers || {};
        if ($localStorage.token) {
          config.headers.Authorization = 'Bearer ' + $localStorage.token;
        }
        return config;
      },
      'responseError': function(response) {
        if(response.status === 401 || response.status === 403) {
          $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  }]);
  
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
}]);