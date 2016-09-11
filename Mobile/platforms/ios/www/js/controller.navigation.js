'use strict';

/* Controllers */

angular.module('GetARide')
  .controller('NavigationCtrl', ['$scope', '$location', '$localStorage','NavigationService', function($scope, $location, $localStorage, NavigationService) {

  	NavigationService.getMenu().then(function(dataResponse){
      $scope.options = dataResponse.Menu;
    });

  	/*$scope.options = [
		{OptionOrder:1, OptionName: "My Information", OptionView: "my_info", OptionClass: "fa-user"},
		{OptionOrder:2, OptionName: "Garage",         OptionView: "garage",     OptionClass: "fa-automobile"},
		{OptionOrder:3, OptionName: "My Driver Rides", OptionView: "myrideweek",    OptionClass: "fa-group"},
		{OptionOrder:4, OptionName: "My Passenger Rides", OptionView: "searchride",    OptionClass: "fa-user"},
		{OptionOrder:4, OptionName: "Notifications", OptionView: "notifications",    OptionClass: "fa-user"},
		{OptionOrder:4, OptionName: "Terms and conditions", OptionView: "termsandconditions",    OptionClass: "fa-user"}
		
	];*/

	$scope.messageHome = $localStorage.messageHome; 
	
    $scope.changeView = function(view){
      if(view == '/'){
        $rootScope.subheader = ""
      }
      $location.path(view); 
    }
    
  }]);