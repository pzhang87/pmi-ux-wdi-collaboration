"use strict";

(function(){
  angular
    .module('gifter')
    .controller('loginController', [
      '$scope',
      '$location',
      'AuthService',
      ControllerFunction
    ]);

  function ControllerFunction($scope, $location, AuthService) {
    console.log(AuthService.getUserStatus());

    $scope.login = function() {
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        .then(function() {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })

        .catch(function() {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };

  }

})();
