(function() {
  "use strict";
  angular
    .module('gifter')
    .controller('DashboardController', [
      '$http',
      '$state',
      ControllerFunction
    ]);

  function ControllerFunction($http, $state) {
    console.log("im here");
    $http.get('/user/lists')

      .success( function(data) {
        this.lists = data;
        console.log(data);
      })

      .error( function() {
        console.log('Error: ' + data);
      });

  }
}());
