(function() {
  "use strict";
  angular
    .module('gifter')
    .directive('listPanel', function() {
      return {
        templateUrl: 'src/js/components/list/list.directive.html',
        restrict: 'E',
        replace: true,
        scope: {
          list: '=',
          vm: '='
        },
        link: function (scope, element, attrs) {
          scope.list = [
            {name : 'Mom'},
            {name : 'Dad'},
            {name : 'Uncle Joe'},
            {name : 'Peter'}
          ];
        }
      };
    });
})();
