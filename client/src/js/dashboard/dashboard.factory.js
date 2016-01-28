(function() {
  angular
    .module('gifter')
    .factory('DashboardFactory', [
      "$resource",
      FactoryFunction
    ]);

  function FactoryFunction($resource) {
    // return $resource("/user/lists");
  }
})();
