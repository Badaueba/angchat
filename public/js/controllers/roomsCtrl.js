var roomsCtrl = angular.module('roomsCtrl', ['socketService', 'angular-growl', 'ngAnimate']);

roomsCtrl.config(['growlProvider', function (growlProvider){
    growlProvider.globalTimeToLive(3000);
    growlProvider.globalReversedOrder(true);
    growlProvider.onlyUniqueMessages(false);
}]);

roomsCtrl.controller ('roomsController', roomsController);

function roomsController ($scope, socket, growl) {
    var ctrl = this;
    ctrl.msg = "";
    ctrl.newRoomFormEnabled = false;
    ctrl.roomsList = [];
    ctrl.newRoom = {};

    socket.emit("get_rooms", {});

    ctrl.enableNewRoomForm = function () {
        ctrl.newRoomFormEnabled = !ctrl.newRoomFormEnabled;
    };

    ctrl.createNewRoom = function () {
        if (ctrl.newRoom.name && ctrl.newRoom.name != "" ) {
            socket.emit("add_room", ctrl.newRoom);
            ctrl.newRoom = {};
            socket.emit("get_rooms", {});
        }
        else
            ctrl.notifications("error", "Room needs a name");
    };

    ctrl.notifications = function (type, msg) {
        var config = {};
        switch (type) {
            case "error":
                growl.error(msg, config);
                break;
            case "message":
                growl.info(msg, config);
                break;
        }
    }

    socket.on("rooms_list", function (data) {
        ctrl.roomsList = data.rooms;
    });
    socket.on('welcome', function (data){
        ctrl.msg = data.msg;
    });



}
