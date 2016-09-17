var roomsCtrl = angular.module('roomsCtrl', ['socketService']);

roomsCtrl.controller ('roomsController', roomsController);

function roomsController ($scope, socket) {
    var ctrl = this;
    ctrl.msg = "";
    ctrl.newRoomFormEnabled = false;
    ctrl.roomsList = [];
    ctrl.newRoom = {};

    ctrl.enableNewRoomForm = function () {
        ctrl.newRoomFormEnabled = !ctrl.newRoomFormEnabled;
    };

    ctrl.createNewRoom = function () {
        socket.emit("add_room", ctrl.newRoom);
        ctrl.newRoom = {};
        socket.emit("get_rooms", {});
    }

    socket.emit("get_rooms", {});
    socket.on("rooms_list", function (data) {
        ctrl.roomsList = data.rooms;
    });
    socket.on('welcome', function (data){
        ctrl.msg = data.msg;
    });



}
