var io = require("socket.io");
module.exports.init = init;

function init (server) {
    io = io.listen(server);

    io.on('connection', function (socket){

        console.log('someone here');
        var data = {msg : 'Welcome! You are on Angular Chat app'}
        socket.emit('welcome', data);

        socket.on('message', function (data){
            console.log(data);
        })

        socket.on("get_rooms", function () {
            console.log('get_rooms');
            var allRooms = [];
            for (var i = 0; i < 10; i ++) {
                allRooms.push ({ name : 'room' + i, usersLength : i+4});
            }
            socket.emit("rooms_list", { rooms : allRooms});
        })
    })
}
