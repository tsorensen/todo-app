angular
.module('dgmTodo.auth', [
  'dgmTodo'
])
.factory('auth', [
  '$http',
  'dgmTodoHost',
  '$q',
  function($http, host, $q) {
    var currentUser;

    var auth = {
      login: function(email, password) {
        return $http
          .post(host + '/session', {
            email: email,
            password: password,
          })
          .then(function(res) {
            currentUser = res.data;
            return res;
          });
      },

      logout: function() {
        return $http
          .delete(host + '/session')
          .then(function(res) {
            currentUser = null;
            return res;
          });
      },

      isLoggedIn: function() {
        if(currentUser !== undefined) {
          return $q.resolve(!!currentUser);
        }
        return $http
          .get(host + '/session')
          .then(function(res) {
            currentUser = res.data;
            return true;
          })
          .catch(function() {
            currentUser = null;
            return false;
          });
      },
    };

    return auth;
  },
]);
