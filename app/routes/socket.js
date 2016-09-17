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
        });

        socket.on("get_rooms", function () {
            console.log('get_rooms');
            socket.emit("rooms_list", { rooms : allRooms});
        });
    })
}
