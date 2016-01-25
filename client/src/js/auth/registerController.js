
(function() {
  "use strict";
  angular
    .module('gifter')
    .controller('registerController', [
      '$scope',
      '$location',
      'AuthService',
      ControllerFunction
    ]);

  function ControllerFunction($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());

    $scope.register = function() {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        .then(function() {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })

        .catch(function() {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });
    };
  }

})();
