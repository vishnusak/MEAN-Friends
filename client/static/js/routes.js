var app = angular.module('myApp', ['ngRoute', '720kb.datepicker'])

app.config(function($routeProvider){
  $routeProvider
  .when('/friends', {
    templateUrl: '../../partials/index.html',
    controller: 'indexController'
  })
  .when('/friends/add', {
    templateUrl: '../../partials/friendSelectDate.html',
    controller: 'addController'
  })
  .when('/friends/:id', {
    templateUrl: '../../partials/friendSelectDate.html',
    controller: 'showController'
  })
  .when('/friends/:id/edit', {
    templateUrl: '../../partials/friendSelectDate.html',
    controller: 'editController'
  })
  .when('/friends/:id/delete', {
    templateUrl: '../../partials/index.html',
    controller: 'deleteController'
  })
  .otherwise({
    redirectTo: '/friends'
  })
})
