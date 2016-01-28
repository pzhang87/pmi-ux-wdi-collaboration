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
      .state('signup', {
        url: '/signup',
        templateUrl: 'src/js/auth/register.html',
        controller: 'registerController',
        access: {restricted: false}
      })
      .state('about', {
        url: '/about',
        templateUrl: 'src/partials/about.html',
        access: {restricted: false}
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'src/partials/profile.html',
        access: {restricted: false}
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'src/js/dashboard/dashboard.html',
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
