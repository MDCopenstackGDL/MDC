'use strict';

/* Controllers */

angular.module('GetARide')
.controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'LoginService', function ($rootScope, $scope, $location, $localStorage, LoginService) {
      $rootScope.subheader = "Login"
      var data;
      $scope.login = function () {
        var formData = {
          email : $scope.email,
          password : $scope.password
        }

        data = LoginService.login(formData)
          .then(function (res) {

            //Validate Access
            if (res.data.Message == 'OK') {
              //User and Password OK. Set session and move
              $localStorage.messageHome = '';
              $localStorage.token = res.data.User[0].idUser;
              $scope.result = res;
              $rootScope.subheader = "Menu"
              $location.path("/menu");
            } else if (res.data.Message == 'Invalid username') {
              //User is not defined in the database
              $localStorage.messageHome = 'Email does not exist in HPE Active Directory. Please use Login Option to try again.';
              $rootScope.subheader = "Home"
              $location.path("/home");
            } else if (res.data.Message == 'Invalid password') {
              //User in the database. Wrong Password
              $localStorage.messageHome = 'Your password is incorrect. Please use Login Option to try again.';
              $rootScope.subheader = "Home"
              $location.path("/home");
            } else if (res.data.Message == 'User is not register') {
              //User is not defined in the database
              $localStorage.messageHome = 'User is not registered. Please use Register Option to access App.';
              $rootScope.subheader = "Home"
              $location.path("/home");
            } else {
              //Something went wrong
              $localStorage.messageHome = 'Something went wrong, please try again. 1';
              $rootScope.subheader = "Home"
              $location.path("/home");
            }
          }, function (res) {
            //Something went wrong


            //Show Message
            $localStorage.messageHome = 'Something went wrong, please try again. 1';
            $rootScope.subheader = "Home"
            $location.path("/home");

          }); //closing then
      };

      $scope.token = $localStorage.token;

    }
  ]);
