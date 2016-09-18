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
        .state('chat', {
            url : '/chat/:room',
            templateUrl : 'views/chat.html',
            controller : 'chatController',
            controllerAs : 'chat'
        })
    $urlRouterProvider.otherwise('/home');
});
