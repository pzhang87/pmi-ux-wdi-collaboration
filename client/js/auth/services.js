"use strict";

(function(){
  angular
    .module('gifter')
    .factory('AuthService', [
      '$q',
      '$timeout',
      '$http',
      ServiceFunction
    ]);

  function ServiceFunction($q, $timeout, $http) {
    var user = null;

    // available functions for use in contorllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });

    // This function returns true if user evaluates to true - a user is logged in - otherwise it returns false.
    function isLoggedIn() {
      if (user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return user;
    }

    function login(username, password) {

      // create instance of deferred
      var deferred = $q.defer();

      // send post request to the server
      $http.post('/user/login', {username: username, password: password})

        .success(function(data, status) {
          if (status === 200 && data.status) {
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })

        .error(function(data) {
          user = false;
          deferred.reject();
        });

        return deferred.promise;
    }

    function logout() {

      var deferred = $q.defer();

      // send post request to the server
      $http.get('/user/logout')

        .success(function(data) {
          user = false;
          deferred.resolve();
        })

        .error(function(data) {
          user = false;
          deferred.reject();
        });

        return deferred.promise;
    }

    function register(username, password) {

      var deferred = $q.defer();

      // send post request to the server
      $http.post('/user/register', {username: username, password: password})

        .success(function(data, status) {
          if (status === 200 && data.status) {
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })

        .error(function(data) {
          deferred.reject();
        });

        return deferred.promise;
    }
  }

})();
