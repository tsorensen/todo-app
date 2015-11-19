angular
  .module('dgmTodo.todos', [
    'dgmTodo'
  ])
  .factory('todos', [
    '$http',
    'dgmTodoHost',
    function($http, host) {
      return {

        create: function(userId, data) {
          return $http
            .post(host + '/users/' + userId + '/todos', data)
            .then(function(res) {
              return res.data;
            });
        }, //end create

        read: function(userId) {
          return $http
          .get(host + '/users/' + userId + '/todos')
          .then(function(res) {
            return res.data;
          });
        }, //end read

        update: function(userId, id, data) {
          return $http
            .put(host + '/users/' + userId + '/todos/' + id, data)
            .then(function(res) {
              return res.data;
            });
        }, //end update

        delete: function(userId, data) {
          return $http
            .delete(host + '/users/' + userId + '/todos/' + data.id)
            .then(function(res) {
              return res.data;
            });
        }, //end delete

      }; //end object return

    }, //end function
  ]); //end factory
