var io = require("socket.io");
module.exports.init = init;

function init (server) {
    io = io.listen(server);
    var allRooms = [];

    io.on('connection', function (socket){

        console.log('someone here');
        var data = {msg : 'Welcome! You are on Angular Chat app'}
        socket.emit('welcome', data);

        socket.on('message', function (data){
            console.log(data);
        });

        socket.on("add_room", function (data) {
            console.log("add room");
            allRooms.push(data);
            io.sockets.emit("rooms_list", {rooms : allRooms});
        });

        socket.on("set_name", function (data) {
            socket.username = data.username;
            console.log(socket.username);
            data = { type : 'success' , message :'Welcome to chat'};
            socket.emit("server_notify", data);
            socket.emit("user_logged", {});
        });

        socket.on("get_rooms", function () {
            console.log('get_rooms');
            socket.emit("rooms_list", { rooms : allRooms});
        });

        socket.on("join_room", function (room) {
            socket.join(room.name);
            socket.room = room.name;
            var data = {
                type : 'info',
                message : socket.username + " has joined the room"
            };
            socket.in(room.name).broadcast.emit('server_notify', data);
        });

        socket.on("message", function (data){
            data.username = socket.username;
            socket.in(socket.room).broadcast.emit("message", data);
            socket.emit("message", data);
        });

        socket.on("disconnect", function (){
            console.log(socket.username + "has left");
        })
    })
}
