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
    $http.get('http://localhost:8080/user/lists')

      .success( function(data) {
        // this.lists = data;
        console.log(data);
      })

      .error( function() {
        console.log('Error: ' + data);
      });

  }
}());
