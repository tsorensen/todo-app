angular
.module('TodosController', [
  'dgmTodo.auth',
  'dgmTodo.todos',
])
.controller('TodosController', [
  'auth',
  '$location',
  'todos',
  function(auth, $location, todos) {
    var self = this;

    auth.isLoggedIn().then(function(currentUser) {
      if(!currentUser) {
        $location.url('/login');
      } else {
        self.currentUser = currentUser;
        readTodos();
      }
    });

    function readTodos() {
      todos.read(self.currentUser.id)
        .then(function(todoItems) {
          self.todos = todoItems;
        });
    }

    function resetCreateForm() {
      self.create = {
        name: null,
        description: null,
        tags: '',
        //priority: null,
        //due-date: null,
      };
    }

    resetCreateForm();

    self.createTodo = function(data) {
      self.errorMessage = '';
      var todo = {
        name: data.name,
        description: data.description,
        tags: (data.tags || '').split(',').map(function(tag) {
                return tag.trim();
              }).filter(function(tag) {
                return tag;
              }),
      };

      todos.create(self.currentUser.id, todo)
        .then(function() {
          readTodos();
          resetCreateForm();
          console.log("success");
        })
        .catch(function(err) {
          // TODO error handle
          self.errorMessage = res.data.message;
          console.log(err);
        });
    };

  }
]);
