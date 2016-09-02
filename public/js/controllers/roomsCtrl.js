var roomsCtrl = angular.module('roomsCtrl', ['socketService']);

roomsCtrl.controller ('roomsController', roomsController);

function roomsController ($scope, socket) {
    var ctrl = this;
    ctrl.msg = "";
    ctrl.roomsList = [];
    
    socket.emit("get_rooms", {});
    socket.on("rooms_list", function (data) {
        ctrl.roomsList = data.rooms;
    });
    socket.on('welcome', function (data){
        ctrl.msg = data.msg;
    });


}
