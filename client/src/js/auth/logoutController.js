
(function() {
  "use strict";
  angular
    .module('gifter')
    .controller('logoutController', [
      '$scope',
      '$location',
      'AuthService',
      ControllerFunction
    ]);

  function ControllerFunction($scope, $location, AuthService) {

    $scope.logout = function() {

      console.log(AuthService.getUserStatus());

      //call logout form service
      AuthService.logout()
        .then(function() {
          $location.path('/login');
        });
    };
  }

})();
