'use strict';

angular.module('GetARide')
  .factory('MyInfoService', ['$http', '$localStorage', 'BASE_URL', function($http, $localStorage, BASE_URL){
		

		
		
    return {
      getgarage: function() {
        var idUser= $localStorage.token;
        return $http.get(BASE_URL.productionUrl + '/garage/'+idUser ).then(function (result) {
            return result.data;
        });
      },
	  
	  getinfo: function(){
      var idUser= $localStorage.token;
		  return $http.get(BASE_URL.productionUrl +'/user/myinfo/'+idUser).then(function(result){
			  if (result.data.Error === false){
			  return result.data.MyInformation[0];
			  }else {
				  alert('no hay info')
			  }
			  
		  });
		  
		  
		  
	  }
	  

    };
    
  }]);