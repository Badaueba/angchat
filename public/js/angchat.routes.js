angular.module('angchat')
.config( function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url : '/home',
            templateUrl : 'views/home.html',
        })
        .state('rooms', {
            url : '/rooms',
            templateUrl : 'views/rooms.html',
            controller : 'roomsController',
            controllerAs : 'rooms',
        })
    $urlRouterProvider.otherwise('/home');
});
