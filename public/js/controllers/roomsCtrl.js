var roomsCtrl = angular.module('roomsCtrl', ['socketService']);

roomsCtrl.controller ('roomsController', roomsController);

function roomsController ($scope, socket) {
    var ctrl = this;
    ctrl.msg = "";
    ctrl.sendMessage = function () {
        socket.emit("message", {msg: 'my msg'});
    };

    socket.on('welcome', function (data){
        console.log(data.msg);
        msg = data.msg;
    });


}
