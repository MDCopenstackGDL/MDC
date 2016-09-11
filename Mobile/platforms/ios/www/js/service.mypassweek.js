'use strict';

angular.module('GetARide')
.factory('PassWeekService', ['$http','$localStorage', 'BASE_URL','$q','WEEKDAYS', 
function($http,$localStorage, BASE_URL,$q,WEEKDAYS){
  return {
    getWeek: function(){
      return $q.resolve({
        MONDAY:[
            {idRide: "1212",
            GoingSite:"Y",
            TravelDate:"2015-12-17T14:30:00Z",
            TravelStatus:"CANCEL"
            },
            {idRide: "1520",
            GoingSite:"N",
            TravelDate:"2015-12-17T18:45:00Z",
            TravelStatus:"ACTIVE"
            }
        ]
        ,
        TUESDAY:[
            { idRide: "1818",
              GoingSite:"Y",
              TravelDate:"2015-12-17T15:30:00Z",
              TravelStatus:"RIDDING"
            },
            { idRide: "2020",
              GoingSite:"N",
              TravelDate:"2015-12-17T19:45:00Z",
              TravelStatus:"ACTIVE"
            }
        ]
      });
    },
    getRideWeek: function(){
      //call service 
      var idUser= $localStorage.token;
      return $http.get(BASE_URL.productionUrl + '/ride/passenger/week/'+idUser)
        .then(
          function(res){
            var week ={};
            var timeday;
            
            angular.forEach(WEEKDAYS, function(da,day){
              week[day]={};
            } );
            if (typeof res.data ==='object'){
              angular.forEach(res.data.Rides, function(ride){
                timeday=new Date(ride.TravelDate).getHours();
                week[ride.Day][""+timeday+""]={
                          "idRide":       ride.idRide,
                          "GoingSite":    ride.GoingSite,
                          "TravelDate":   ride.TravelDate,
                          "TravelStatus": ride.TravelStatus
                          };
              } );
              return $q.resolve(week);
            }
            else {
              return $q.reject(res.data);
            }
          },
          function(res){
            return $q.reject(res.data);          
          }
        );
        
    }
  }//return
    
}]);