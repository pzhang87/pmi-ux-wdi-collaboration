(function() {
  angular
    .module('dashboard')
    .factory('DashboardFactory', [
      "$resource",
      FactoryFunction
    ]);

  function FactoryFunction($resource) {
    return $resource("/user/lists/:id", {}, {
      update: {method: "PUT"}
    });
  }
})();
