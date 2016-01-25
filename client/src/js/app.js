(function(){
  angular
    .module('gifter', [
      'ui.router',
      'ui.bootstrap'
    ])
    .config([
      "$stateProvider",
      "$urlRouterProvider",
      RouterFunciton
    ])
    .run([
      '$rootScope',
      '$location',
      '$state',
      'AuthService',
      RunFunction
    ]);

  function RouterFunciton($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/partials/home.html',
        access: {restricted: false}
      })
      .state('login', {
        url: '/login',
        templateUrl: 'src/js/auth/login.html',
        controller: 'loginController',
        access: {restricted: false}
      })
      .state('logout', {
        url: '/logout',
        controller: 'logoutController',
        access: {restricted: true}
      })
      .state('register', {
        url: '/register',
        templateUrl: 'src/js/auth/register.html',
        controller: 'registerController',
        access: {restricted: true}
      })
      .state('one', {
        url: '/one',
        template: '<h1>This is page one!</h1>',
        access: {restricted: true}
      })
      .state('two', {
        url: '/two',
        template: '<h1>This is page two!</h1>',
        access: {restricted: false}
      });

    $urlRouterProvider.otherwise('/');
  }


  // listens for state change and checks to see if the destination state requires a user to be authenticated or not
  function RunFunction($rootScope, $location, $state, AuthService) {

    $rootScope.$on('$stateChangeStart', function(event, next, current) {

      // if user is not logged in direct them to the login path
      if (next.access.restricted && AuthService.isLoggedIn() === false) {
        $location.path('/login');
        $state.reload();
      }

    });

  }


})();
