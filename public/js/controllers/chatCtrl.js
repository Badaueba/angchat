var chatCtrl = angular.module('chatCtrl', ['angular-growl']);

chatCtrl.config([ 'growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive(3000);
    growlProvider.globalReversedOrder(true);
    growlProvider.onlyUniqueMessages(false);
}]);

chatCtrl.controller('chatController', chatController);

function chatController (socket, growl, $stateParams){
    var ctrl = this;
    ctrl.userHasName = false;
    ctrl.username = "";

    ctrl.init = function (){

        if (ctrl.username && ctrl.username !== ""){
            socket.emit("set_name", {username : ctrl.username});
            ctrl.userHasName = true;
        }
        else {
            var config = {};
            growl.error('You need to provide a nickname!', config);
        }
    };

    ctrl.notifications = function (type, msg) {
        var config = {};
        switch (type) {
            case "error":
                growl.error(msg, config);
                break;
            case "info":
                growl.info(msg, config);
                break;
            case "success":
                growl.success(msg, config);
                break;
        }
    };

    ctrl.sendMessage = function (){
        socket.emit("message", {message : ctrl.message});
        ctrl.message = "";
    }
    socket.on("server_notify", function (data) {
        console.log("server_notify");
        ctrl.notifications(data.type, data.message);
    });
    socket.on("user_logged", function (data) {
        socket.emit("join_room", { name : $stateParams.room})
    })

    socket.on("message", function (data) {

        var messageLI = document.createElement("LI");
        var messageText = document.createTextNode(data.username + ": " + data.message);
        messageLI.appendChild(messageText);
        var messageUL = document.getElementById("messages");
        messageUL.appendChild(messageLI);

        console.log(data);
    });
}
