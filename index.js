const express = require('express')
const app = express()
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function(request, respons) {
   respons.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];

io.sockets.on('connection', function(socket){

  console.log("УСПЕШНОЕ СОЕДИНЕНИЕ");
   connections.push(socket);

   socket.on('disconnect', function(data){
     connections.splice(connections.indexOf(socket), 1);
     console.log("ОТКЛЮЧИЛИСЬ");
   });

socket.on('send mess', function(data) {
  io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
});

});
