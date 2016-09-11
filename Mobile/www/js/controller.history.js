'use strict';
/* Controllers */
angular.module('MDC')
  .controller('HistoryCtrl', ['$scope', '$location', '$localStorage', '$mdToast', 'HistoryService', function($scope, $location, $localStorage, $mdToast, HistoryService) {
    
    $scope.history = {
      comments: '',
      answers: []
    };

    $scope.setHistory = function() {

      var qa = { questions: [,] }    
      
      qa.questions.push(2,user.q);

      var data= HistoryService.setHistory($scope.user).then(function(res) {
        //Validate Access
        if (res.data.Error) {
          console.log("Error Message: " + res.data.Message);
          $mdToast.show(
            $mdToast.simple().textContent("Error Message: " + res.data.Message).position('top right')
          );
        } else {
          console.log("User history was saved.");
          $mdToast.show(
            $mdToast.simple().textContent("Se guardó el historial!").position('top right')
          );
        }
      }); //closing then
      
    };

    $scope.getHistory = function() {

      var data= HistoryService.getHistory().then(function(res) {
        //Validate Access
        if (res.data.Error) {
          console.log("Error Message: " + res.data.Message);
          $mdToast.show(
            $mdToast.simple().textContent("Error Message: " + res.data.Message).position('top right')
          );
        } else {
          console.log("User history was loaded.");
          
          for (var i = 0 ; i < res.data.answers.length ; i++)
          {
            $scope.history.answers.push({
              idQuestion:res.data.answers[i].idQuestion,
              question:res.data.answers[i].question,
              idAnswer:res.data.answers[i].idAnswer,
              answer:res.data.answers[i].answer,
            })
          }
          $scope.history.comments = res.data.comments;

        }
      }); //closing then
      
    };
    $scope.getHistory();
}]);