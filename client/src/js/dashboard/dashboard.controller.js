(function() {
  "use strict";
  angular
    .module('dashboard')
    .controller('DashboardController', [
      'DashboardFactory',
      '$state',
      ControllerFunction
    ]);

  function ControllerFunction(DashboardFactory, $state) {
    this.lists = DashboardFactory.query();
    console.log(this.lists);
  }
}());
