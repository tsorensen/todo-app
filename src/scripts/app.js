angular
  .module('TodoApp', [
    'ngRoute',
    'LoginController',
    'TodosController'
  ])
  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/login', {
          templateUrl: '/partials/login-controller.html',
          controller: 'LoginController',
          controllerAs: 'login'
        })
        .when('/todos', {
          templateUrl: '/partials/todos-controller.html',
          controller: 'TodosController',
          controllerAs: 'todo',
        })
        .otherwise('/login');
    }
  ]);
