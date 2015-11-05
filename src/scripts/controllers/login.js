angular
  .module('LoginController', [
    'dgmTodo.auth',
    'dgmTodo.users',
    'toggleDirective',
  ])
  .controller('LoginController', [
    'auth',
    'users',
    '$location',
    function(auth, users, $location) {
      var login = this;
      login.inputType = 'signin';

      auth.isLoggedIn().then(function(isLoggedIn) {
        if(isLoggedIn) {
          $location.url('/todos');
        }
      });

      login.submit = function(email, password) {
        login.errorMessage = null;

        login[login.inputType](email, password)
          .then(function(res) {
            // TODO redirect to the todos page
            $location.url('/todos');
            console.log('success');
          })
          .catch(function(res) {
            console.log(res.status, res.data);
            login.errorMessage = res.data.message;
          });
      };

      login.signin = function(email, password) {
        return auth.login(email, password);
      };

      login.signup = function(email, password) {
        return users
          .create({
            email: email,
            password: password
          })
          .then(function(res) {
            return auth.login(email, password);
          });
      };
    },
  ]);
