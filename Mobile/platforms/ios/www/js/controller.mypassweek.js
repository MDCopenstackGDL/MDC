'use strict';

/* Controllers */

angular.module('GetARide')
  .controller('MyPassWeekCtrl', ['$rootScope', '$scope', '$location','PassWeekService', 'WEEKDAYS',
    function($rootScope, $scope, $location, PassWeekService,WEEKDAYS) {
      $rootScope.subheader = "My passenger week"
      var rideWeek={};
      $scope.days=WEEKDAYS;
      $scope.hours={7:'07:00',8:'08:00',9:'09:00',10:'10:00',11:'11:00',12:'12:00',13:'13:00',14:'14:00',15:'15:00',16:'16:00',17:'17:00',18:'18:00'};
      //,19:'19:00',20:'20:00',21:'21:00',22:'22:00',23:'23:00',24:'24:00'};
      
      $scope.colorRideStatus={
        'GOING':'btn-primary' // in progress
       ,'SCHEDULED':'btn-success' // ready
       //,3:'bg-info'    // could be ready too
       ,'WITHOUT PASSENGERS':'btn-warning' //Pending approval
       ,'CANCELLED' :'btn-danger'  // canceled
      };
      
      $scope.showModal = "none"; //pending to move into th directive 
      $scope.setModal = function(setMod){ //pending to move into th directive 
        $scope.selModal=setMod;
        //$scope.showModal = !$scope.showModal;
      };
      $scope.isOpen = function(thisMod){
        //$event.stopPropagation();
        return $scope.selModal===thisMod;
        //$scope.showModal = !$scope.showModal;
      };
      
      PassWeekService.getRideWeek()  //getRideWeek()
        .then( function(res){
            $scope.rideWeek=res;
          }
        );
      
    //  var response=PassWeekService.getWeek();
    //  for (var day in $scope.days){
    //    var day_obj= response[day]
    //    rideWeek[day]={};
    //    for (var idx in day_obj){
    //      var timeday=new Date(day_obj[idx].TravelDate).getHours();
    //      (rideWeek[day][""+timeday+""])=day_obj[idx];
    //    }
    //  }
    //  $scope.rideWeek=rideWeek;
    }
  ]);