var express = require("express");
var http = require("http");
var path = require("path");
var app = express(app);
var server = http.createServer(app);
var port = process.env.PORT || 8000;
var socket = require('./app/routes/socket');

app.use( express.static( __dirname + '/public'));
app.get('/', function (req, res){
    res.send(path.join(__dirname + '/public/index.html'));
});

server.listen(port, () =>{
    socket.init(server);
    console.log("Listening to: " + port);
});
