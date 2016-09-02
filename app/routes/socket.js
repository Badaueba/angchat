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
    })
}
