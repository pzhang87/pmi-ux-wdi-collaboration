
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

      AuthService.register($scope.registerForm.username, $scope.registerForm.password,$scope.registerForm.firstName,$scope.registerForm.lastName,$scope.registerForm.birthday)
        .then(function() {
          $location.path('/');
          $scope.disabled = false;
          $scope.registerForm = {};
        })

        .catch(function() {
          $scope.error = true;
          $scope.errorMessage = "The username you entered is already in use";
          $scope.disabled = false;
          $scope.registerForm = {};
        });
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'dd/MM/yyyy', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup2 = {
      opened: false
    };



  }

})();
