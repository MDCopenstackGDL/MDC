'use strict';

/* Controllers */

var app= angular.module('GetARide');
  app.controller('MyRideWeekCtrl', ['$rootScope', '$scope', '$location','RideWeekService', 'WEEKDAYS',
    function($rootScope, $scope, $location, RideWeekService,WEEKDAYS) {
      $rootScope.subheader = "My ride week"
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
      
      
      $scope.showModal = "none";
      $scope.setModal = function(setMod){
        $scope.selModal=setMod;
        //$scope.showModal = !$scope.showModal;
      };
      $scope.isOpen = function(thisMod){
        //$event.stopPropagation();
        return $scope.selModal===thisMod;
        //$scope.showModal = !$scope.showModal;
      };
      RideWeekService.getRideWeek()//getRideWeek()
        .then( function(res){
            $scope.rideWeek=res;
          }
        );
      
   //  //var response=RideWeekService.getWeek();
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
  
  app.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog modal-sm">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, eMod, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(eMod).modal('show');
          else
            $(eMod).modal('hide');
        });

        $(eMod).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(eMod).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
            
          });
        });
      },
      
    };
  });
  
  app.filter('camelCase', function(){
    return function(txt){
      txt=txt||'';
      return txt.replace(/\w\S*/g, function(value){
        return value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
      });
    }
  });