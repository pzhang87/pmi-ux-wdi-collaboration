(function() {
  "use strict";
  angular
    .module('gifter')
    .controller('DropdownController', [
      '$scope',
      ControllerFunction
    ]);

  function ControllerFunction($scope) {

    $scope.isCollaspsed = true;
  }
})();
